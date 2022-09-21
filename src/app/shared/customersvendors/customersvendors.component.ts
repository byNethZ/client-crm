import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customersvendors',
  templateUrl: './customersvendors.component.html',
  styleUrls: ['./customersvendors.component.scss']
})
export class CustomersvendorsComponent implements OnInit {
  public token: string | null = localStorage.getItem('token');

  public vendorsArray: string[] = [];
  public customersTotalArray: number[] = [];

  public barChartOptions: any = {};

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
  ) { }

  ngOnInit(): void {
    this.barChartOptions = this.getCustomersChartOptions(this.obj);
    this.getData();
  }

  getCustomersChartOptions(obj: any) {
    return {
      series: [
        {
          name: 'Clientes',
          data: this.customersTotalArray,
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
        categories: this.vendorsArray,
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

  getData(){
    this._dashboardService.getCustomersByVendor(this.token!).subscribe(
      response => {

        this.organiceData(response.customerByVendor)
        this.barChartOptions = this.getCustomersChartOptions(this.obj);
      },
      error => {
        console.log(error)
      }
    )
  }

  organiceData(arrayTotal: any []){

    arrayTotal.map( (data) => {
      this.vendorsArray.push(data.name);
      this.customersTotalArray.push(data.total);

    })
  }

}
