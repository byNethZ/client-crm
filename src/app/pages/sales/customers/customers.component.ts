import { Component, OnInit } from '@angular/core';
import { Customer, Customer_Type } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CustomertypesService } from 'src/app/services/customertypes.service';
import Utils from 'src/utils/Utils';
import { VendorService } from 'src/app/services/vendor.service';
import { User } from 'src/app/models/user.interface';

type paramsFilter = {
  vendor_id: string;
  type_id: string;
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  public paramsFilter: paramsFilter = {
    vendor_id: '99',
    type_id: '99',
  };

  public utils = new Utils();
  public customers: Customer[] = [];
  public customersTypes: Customer_Type[] = [];
  public vendors: User[] = [];
  public customersFiltered: Customer[] = [];
  public token: string = localStorage.getItem('token')!;
  public role_id: number = parseInt(localStorage.getItem('role_id')!);
  public filterValue: string = '';
  public idIndustryURL: string | null = null;
  public title: string = 'Clientes General';

  public currentPage: number = 1;
  public lastPage: number = 5;
  public totalCustomers: number = 0;

  constructor(
    private _customerService: CustomerService,
    private _customerTypeService: CustomertypesService,
    private _vendorService: VendorService,
    private _customerTypesService: CustomertypesService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCustomers(true);
    this.setTitle();
    this.getVendors();
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

  getCustomers(isRefresh: boolean) {
    if(isRefresh) this.customers = [];
    this.idIndustryURL = this._route.snapshot.paramMap.get('id');

    if (this.idIndustryURL) {
      this._customerService
        .getCustomersByProperty(this.token, 'type_id', parseInt(this.idIndustryURL), this.currentPage)
        .subscribe(
          (response) => {
            this.setDataCustomers(response.customers.data)
            if(this.currentPage === 1) {
              this.lastPage = response.customers.last_page;
              this.totalCustomers =  response.customers.total;
            };
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

    this._customerService.getCustomers(this.token, this.currentPage).subscribe(
      (response) => {
        this.setDataCustomers(response.customers.data);
        if(this.currentPage === 1) {
          this.lastPage = response.customers.last_page;
          this.totalCustomers =  response.customers.total;
        };
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

    if(this.currentPage === 1) this.getCustomerTypes();
  }

  setDataCustomers(data: Customer[]){
    if(this.customers.length === 0){
      this.customers = data;
    } else {
      this.customers = [...this.customers, ...data]
    }

    this.filterByBusiness();

  }

  getCustomerTypes() {
    if (!this.idIndustryURL) {
      this._customerTypesService.getCustomerTypes(this.token).subscribe(
        (response) => {
          this.customersTypes = response;
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
  }

  setTitle() {
    this.idIndustryURL = this._route.snapshot.paramMap.get('id');

    if (this.idIndustryURL) {
      let industry;
      this._customerTypeService
        .getIndustryById(this.token, this.idIndustryURL)
        .subscribe(
          (response) => {
            //console.log(response.type);
            industry = response.type;
            this.title = `Clientes de la Industria: ${industry}`;
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
  }

  setFilter(event: Event){
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterByBusiness();
  }

  filterByBusiness() {
    //console.log(this.filterValue);
    let filterValueLower = this.filterValue.toLowerCase();
    if (this.filterValue === '') {
      this.filterBySelect();

    } else {
      this.customersFiltered = this.customersFiltered.filter((customer) =>
        customer?.business?.toLowerCase().includes(filterValueLower, -1)
      );
    }
  }

  deleteCustomer(id: number) {
    //console.log(id);

    Swal.fire({
      title: 'Confirmación',
      text: 'Se eliminirá el registro del cliente ¿Continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar cliente',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._customerService.delete(id, this.token).subscribe(
          (response) => {
            this.getCustomers(true);
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'El cliente ha sido eliminado',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
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
    });
  }

  filterBySelect() {

    this.customersFiltered = this.customers.filter((customer) => {
      if(this.paramsFilter.vendor_id !== '99'){
        return customer.vendor_id === parseInt(this.paramsFilter.vendor_id);

      }
      return true;
    })
    .filter((customer) => {
      if(this.paramsFilter.type_id !== '99'){
        return customer.type_id === parseInt(this.paramsFilter.type_id);

      }
      return true;
    })

  }

  getMore(){
    this.currentPage ++;
    this.getCustomers(false);
  }
}
