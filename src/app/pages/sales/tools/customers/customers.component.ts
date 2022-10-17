import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CustomertypesService } from 'src/app/services/customertypes.service';
import Utils from 'src/utils/Utils';
import { VendorService } from 'src/app/services/vendor.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public idVendorSelected: number = 99;
  public utils = new Utils();
  public customers: Customer[] = [];
  public vendors: User[] = [];
  public customersFiltered: Customer[] = [];
  public token: string = localStorage.getItem('token')!;
  public role_id: number = parseInt(localStorage.getItem('role_id')!);
  public filterValue: string;
  public idIndustry: string | null = null;
  public title: string = 'Clientes General';

  constructor(
    private _customerService: CustomerService,
    private _customerTypeService: CustomertypesService,
    private _vendorService: VendorService,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getCustomers();
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
      }
    );
  }

  getCustomers(){
    this.idIndustry = this._route.snapshot.paramMap.get('id');

    if(this.idIndustry){
      this._customerService.getCustomersByIndustry(this.token, this.idIndustry).subscribe(
        response => {
          this.customers = response.customers;
          this.customersFiltered = this.customers;
          //console.log(this.customers);
        },
        error => {
          console.log(error)
        }
      )
      return;
    }

    this._customerService.getCustomers(this.token).subscribe(
      response => {
        this.customers = response.customers;
        this.customersFiltered = this.customers;
        //console.log(this.customers);

      },
      error => {
        console.log(error);
      }
      )

    }

    setTitle(){
      this.idIndustry = this._route.snapshot.paramMap.get('id');

      if(this.idIndustry){
        let industry;
        this._customerTypeService.getIndustryById(this.token, this.idIndustry).subscribe(
          response => {
            //console.log(response.type);
            industry = response.type
            this.title = `Clientes de la Industria: ${industry}`
          },
          error => {
            console.log(error)
          }
        )
      }

    }

    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      //console.log(this.filterValue);
      let filterValueLower = this.filterValue.toLowerCase();
      if(this.filterValue === '' && this.idVendorSelected === 99 ) {

          this.customersFiltered = this.customers;
        }
        else if ( this.filterValue === '' && this.idVendorSelected !== 99 ) {

          this.customersFiltered = this.customers.filter( customer => customer.vendor_id === this.idVendorSelected);
      } else {

        this.customersFiltered = this.customersFiltered.filter((customer) => customer?.business?.toLowerCase().includes(filterValueLower,-1))
      }

    }

    deleteCustomer(id: number){
      //console.log(id);

      Swal.fire({
        title: 'Confirmación',
        text: "Se eliminirá el registro del cliente ¿Continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar cliente',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._customerService.delete(id, this.token).subscribe(
            response => {
              this.getCustomers();
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'El cliente ha sido eliminado',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              })

            },
            error => {
              console.log(error);

            }
          )
        }
      })
    }

    setVendorId(evt: Event) {
      this.idVendorSelected = parseInt((evt.target as HTMLSelectElement).value);

      if(this.idVendorSelected === 99){
        this.customersFiltered = this.customers;

        return;
      }

      this.customersFiltered = this.customers.filter( customer => customer.vendor_id === this.idVendorSelected )


    }

}
