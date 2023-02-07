import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';
import { VendorService } from 'src/app/services/vendor.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';
import styles from './stylesMap';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  public utils = new Utils();

  public token: string | null = localStorage.getItem('token');
  public role: number = parseInt(localStorage.getItem('role_id')!);
  public id: number = parseInt(localStorage.getItem('id')!);
  public departamentUser: number | null = parseInt(localStorage.getItem('departament_id')!);
  public departamentAltUser: number | null = parseInt(localStorage.getItem('departament_alt_id')!);

  center: google.maps.LatLngLiteral;
  lat: number = 38;
  lng: number = -97;
  public zoom: number = 5;
  public idVendor: string = '99';
  public idVendorNumber: number = this.id;
  public vendors: any[] = [];

  public markers: any[] = [];

  public optionsMap: google.maps.MapOptions = {
    //mapTypeId: '',
    zoomControl: true,
    scrollwheel: true,
    styles: styles,
  };

  public arrayCategories: any[] = [];

  public statesDataArray: any[] = [];
  public customerByStatus: any[] = [];

  public statesArray: string[] = [];
  public statesTotalArray: number[] = [];

  public categoryArrayOne: string[] = [];
  public categoryTotalArrayOne: number[] = [];

  public categoryArrayTwo: string[] = [];
  public categoryTotalArrayTwo: number[] = [];

  public barChartOptions: any = {};
  public pieOneChartOptions: any = {};
  public pieTwoChartOptions: any = {};

  public currentTotal: number = 0;
  public currentTotalMarketing: number = 0;
  public currentTotalByVendor: any[] = []
  public currentStatusByVendor: any[] = []
  public currentOrganizedByVendor: any[] = []
  public prospectsMarketing: any[] = []


  obj = {
    primary: '#0034c8',
    secondary: '#7987a1',
    success: '#05a34a',
    info: '#66d1d1',
    warning: '#fbbc06',
    danger: '#ff3366',
    light: '#e9ecef',
    dark: '#060c17',
    muted: '#7987a1',
    gridBorder: 'rgba(77, 138, 240, .15)',
    bodyColor: '#000',
    cardBg: '#fff',
    fontFamily: "'Roboto', Helvetica, sans-serif",
    white: '#fff',
    first: '#0cb7f2',
    second: '#53d4ff',
    third: '#8fe3ff',
    fourth: '#bceeff',
    fifth: '#def7ff',
    sixth: '#318ce7',
    seventh: '#4d9ae9',
  };

  constructor(
    private _dashboardService: DashboardService,
    private _router: Router,
    private _vendorService: VendorService
  ) {
    this.center = {
      lat: this.lat,
      lng: this.lng,
    };
  }

  ngOnInit(): void {
    this.barChartOptions = this.getCustomerseChartOptions(this.obj);
    this.pieOneChartOptions = this.getFirstCategoryChartOptions(this.obj);
    this.pieTwoChartOptions = this.getSecondCategoryChartOptions(this.obj);

    this.getData();
    this.getVendors();
  }

  getCustomerseChartOptions(obj: any) {
    return {
      series: [
        {
          name: 'Clientes',
          data: this.statesTotalArray,
        },
      ],
      chart: {
        type: 'bar',
        height: '320',
        parentHeightOffset: 0,
        foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false,
        },
      },
      colors: [obj.primary],
      grid: {
        padding: {
          bottom: -4,
        },
        borderColor: obj.gridBorder,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'string',
        categories: this.statesArray,
        axisBorder: {
          color: obj.gridBorder,
        },
        axisTicks: {
          color: obj.gridBorder,
        },
      },
      yaxis: {
        labels: {
          offsetX: 0,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
    };
  }

  getFirstCategoryChartOptions(obj: any) {
    let array = this.arrayCategories,
      id: number,
      routerIntern = this._router;
    return {
      series: this.categoryTotalArrayOne,
      labels: this.categoryArrayOne,
      chart: {
        height: 300,
        type: 'pie',
        foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false,
        },
        events: {
          dataPointSelection: function (
            event: any,
            chartContext: any,
            config: any
          ) {
            let categoryClicked: any,
            areaClicked = config.w.config.labels[config.dataPointIndex];

            categoryClicked = array.find(
              (category: any) => category.type === areaClicked
            );
            //id = categoryClicked.type_id;
            console.log(categoryClicked, array);
            return;
            routerIntern.navigate([`sales/customers/category/${id}`]);

          },
        },
      },
      colors: [
        obj.first,
        obj.second,
        obj.third,
        obj.fourth,
        obj.fifth,
        obj.sixth,
        obj.seventh,
      ],
      stroke: {
        colors: ['rgba(0,0,0,0)'],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
    };
  }

  getSecondCategoryChartOptions(obj: any) {
    let array = this.arrayCategories,
      id: number,
      routerIntern = this._router;
    return {
      series: this.categoryTotalArrayTwo,
      labels: this.categoryArrayTwo,
      chart: {
        height: 300,
        type: 'pie',
        foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false,
        },
        events: {
          dataPointSelection: function (
            event: any,
            chartContext: any,
            config: any
          ) {
            let categoryClicked: any,
              areaClicked = config.w.config.labels[config.dataPointIndex];

            categoryClicked = array.find(
              (category: any) => category.type === areaClicked
            );
            id = categoryClicked.type_id;
            routerIntern.navigate([`sales/customers/category/${id}`]);
            //console.log(id);
          },
        },
      },
      colors: [
        obj.first,
        obj.second,
        obj.third,
        obj.fourth,
        obj.fifth,
        obj.sixth,
        obj.seventh,
      ],
      stroke: {
        colors: ['rgba(0,0,0,0)'],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
    };
  }

  getData() {
    this.getCurrentDay();

    if (this.idVendor === '99') {
      this._dashboardService.getSalesData(this.token!).subscribe(
        (response) => {
          //console.log(response);
          this.organiceData(response.countByState, response.countByCategory);
          this.statesDataArray = response.countByState;
          this.customerByStatus = response.customersByStatus;

          //console.log(this.customerByStatus);
          this.addMarkers(this.statesDataArray);
        },
        (error) => {
          console.log(error);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: `Error: ${error.message}`,
            showConfirmButton: false,
            showCloseButton: true
          });
        }
      );
      return;
    }

    this._dashboardService
      .getSalesDataByVendor(this.token!, this.idVendor)
      .subscribe(
        (response) => {
          //console.log(response);
          this.organiceData(response.countByState, response.countByCategory);
          this.statesDataArray = response.countByState;
          this.customerByStatus = response.customersByStatus;
          //console.log(this.customerByStatus);
          //console.log(this.statesDataArray)
          this.addMarkers(this.statesDataArray);
        },
        (error) => {
          console.log(error);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: `Error: ${error.message}`,
            showConfirmButton: false,
            showCloseButton: true
          });
        }
      );
  }

  getCurrentDay(){
    this._dashboardService.getCustomerCurrentDay(this.token!).subscribe(
      (response) => {
        //console.log(response);
        if (this.role === 1 || this.departamentUser === 8){
          this.currentTotal = response.data.total[0].total;
          this.currentTotalByVendor = response.data.totalbyVendor;
          this.currentStatusByVendor = response.data.byStatus;

          this.setProspectsMarketing(response.data.byMarketing)

          this.mergeStatusArray(this.currentTotalByVendor, this.currentStatusByVendor);

        } else {
          this.currentTotal = response.data.total;
          this.currentStatusByVendor = response.data.byStatus;

          console.log(this.currentStatusByVendor);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true
        });
      }
    );
  }

  setProspectsMarketing(data: any){
    this.prospectsMarketing = data;

    this.prospectsMarketing.map( (data) => {
      this.currentTotalMarketing += data.total;
    } )
  }

  mergeStatusArray(arrOne: any[], arrTwo: any[]) {
    arrOne.map( (el) =>{
      this.currentOrganizedByVendor.push({
        ...el,
        status: (arrTwo.filter( (itm) => itm.name === el.name))
      })
    })

    //console.log(this.currentOrganizedByVendor);
  }

  organiceData(stateData: any, categoryData: any) {
    this.arrayCategories = categoryData;
    //console.log(this.arrayCategories);

    categoryData.map((data: any) => {
      if (data.isLeader === 1) {
        this.categoryArrayOne.push(data.type);
        this.categoryTotalArrayOne.push(data.total);
      } else {
        this.categoryArrayTwo.push(data.type);
        this.categoryTotalArrayTwo.push(data.total);
      }
    });

    //for State Array
    //console.log(stateData);
    stateData.map((data: any) => {
      this.statesArray.push(data.state_name);
      this.statesTotalArray.push(data.total);
    });

    this.barChartOptions = this.getCustomerseChartOptions(this.obj);
    this.pieOneChartOptions = this.getFirstCategoryChartOptions(this.obj); //Category 1/2
    this.pieTwoChartOptions = this.getSecondCategoryChartOptions(this.obj); //Category 2/2
  }

  addMarkers(data: any) {
    //console.log(data);
    data.map((state: any) => {
      this.markers.push({
        position: {
          lat: parseFloat(state.lat),
          lng: parseFloat(state.lng),
        },
        label: {
          color: 'black',
          text: '' + state.total,
        },
      });
    });
  }

  getVendors() {
    this._vendorService.getVendors(this.token!).subscribe(
      (response) => {
        //console.log(response)
        this.vendors = response;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true
        });
      }
    );
  }

  setVendorId(evt: any) {
    //console.log(evt.target?.value);
    this.idVendor = evt.target.value;
    this.idVendorNumber = this.idVendor !== '99' ? parseInt(this.idVendor) : this.id;
    this.categoryArrayOne = [];
    this.categoryArrayTwo = [];
    this.categoryTotalArrayOne = [];
    this.categoryTotalArrayTwo = [];
    this.statesArray = [];
    this.statesTotalArray = [];
    this.statesDataArray = [];
    this.markers = [];
    //console.log(this.statesDataArray)
    this.getData();
  }
}
