import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { Link } from 'src/app/models/link.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { LinksService } from 'src/app/services/links.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.scss'],
})
export class CreateChecklistComponent implements OnInit {
  public form: FormGroup;
  public token: string = localStorage.getItem('token')!;
  public idUser: string = localStorage.getItem('id')!;
  public link: Link;
  public customers: Customer[] = [];
  public customerSelected: Customer | null = null;
  public customersFiltered: Customer[];
  public filterValue: string;

  controlCust = new FormControl();

  filCustomers: Observable<Customer[]> = new Observable();

  constructor(
    private _customerService: CustomerService,
    private _router: Router,
    private _linkService: LinksService
  ) {
    this.form = new FormGroup({
      urldropbox: new FormControl('', [Validators.required]),
      customer: new FormControl('', [Validators.required]),
    });
    this.link = {
      id: 1,
      customer: '',
      user_id: this.idUser,
      urldropbox: '',
      message: '',
      aprobed: 0,
      approver: '',
      created_at: '',
      updated_at: '',
      customer_id: 1
    }
  }

  ngOnInit(): void {
    this.getCustomers();
    this.filCustomers = this.controlCust.valueChanges.pipe(
      startWith(''),
      map(val => (typeof val === 'string' ? val : val.business)),
      map(business => (business ? this._filterCustomers(business) : this.customers.slice()))
    );
  }

  getCustomers() {
    this._customerService.getCustomersByStatus(this.token, 5).subscribe(
      (response) => {
        this.customers = response.customers;
        this.customersFiltered = this.customers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private _filterCustomers(value: string): Customer[] {
    const formatVal = value.toLowerCase();


    return this.customers.filter(
      (customer) => customer.business?.toLowerCase().includes(formatVal)
    );
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    //console.log(this.filterValue);
    let filterValueLower = this.filterValue.toLowerCase();
    if (this.filterValue === '') {
      this.customersFiltered = this.customers;
    } else {
      this.customersFiltered = this.customers.filter((customer) =>
        customer.business.toLowerCase().includes(filterValueLower, -1)
      );
    }
  }

  displayFnCust(customer: Customer): string {
    return customer ? customer.business : '';
  }

  OnCustomerSelected(option: MatOption) {
    this.customerSelected = option.value;
  }

  reloadCurrentRoute() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  save(evt: Event) {
    evt.preventDefault();

    // this.link.customer = this.customerSelected?.business;
    // this.link.customer_id = this.customerSelected?.id ? this.customerSelected?.id : 1;
    this.link.customer = this.form.value.customer;
    this.link.urldropbox = this.form.value.urldropbox;

    this._linkService.createLink(this.link, this.token).subscribe(
      response => {
        if(this._router.url === '/design/checklists'){
          this.reloadCurrentRoute();
        } else {
          this._router.navigate(['/dashboard/enlaces']);
        }
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El enlace ha sido creado ceremoniosamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });


      },
      error => {
        console.log(error);

      }
    )

  }
}
