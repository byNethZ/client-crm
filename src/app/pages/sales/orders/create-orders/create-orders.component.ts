import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { WizardComponent } from 'angular-archwizard';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import {
  OrderProductGeneral,
  OrderProductUniforms,
} from 'src/app/models/orders.interface';
import { State } from 'src/app/models/state.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { StateService } from 'src/app/services/state.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.scss'],
})
export class CreateOrdersComponent implements OnInit {
  public utils: Utils = new Utils();
  public token: string = localStorage.getItem('token')!;
  public id: number = parseInt(localStorage.getItem('id')!);

  //data arrays
  public states: State[] = [];
  public customers: Customer[] = [];
  public customersFiltered: Customer[] = [];
  public productsOrder: Array<OrderProductUniforms | OrderProductGeneral> = [
    {
      status: 1,
      product_id: 1,
      sku: '',
      name: '',
      product_category_id: 1,
      description: '',
      subtotal: 1,
      type: 1,
      size_xs: 1,
      size_s: 1,
      size_m: 1,
      size_l: 1,
      size_xl: 1,
      size_xxl: 1,
      color: '',
    },
    {
      status: 1,
      product_id: 2,
      sku: '',
      name: '',
      product_category_id: 2,
      description: '',
      subtotal: 1,
      qty: 1,
    },
  ];

  //forms
  public customerData: FormGroup;
  public orderData: FormGroup;

  public isCustomerDataSubmitted: boolean;
  public isOrderDataSubmitted: boolean;

  //mat autocomplete
  public controlCustomer = new FormControl();
  public customerSelected: Customer | null = null;
  public filCustomers: Observable<Customer[]> = new Observable();

  @ViewChild('wizardForm') public wizard: WizardComponent;

  constructor(
    public formBuilder: FormBuilder,
    private _customerService: CustomerService,
    private _stateService: StateService
  ) {
    this.customerData = this.formBuilder.group({
      // status: ['', [Validators.required, Validators.email]],
      user_id: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      phone: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      customer_id: [{ value: '', disabled: true }, Validators.required],
      shipping_address: [{ value: '', disabled: true }, Validators.required],
      shipping_state_id: [{ value: '', disabled: true }, Validators.required],
      shipping_zipcode: [{ value: '', disabled: true }, Validators.required],
      alternative_phone: [{ value: '', disabled: true }],
      address_on_product: [{ value: '', disabled: true }, Validators.required],
    });
    this.orderData = this.formBuilder.group({});
    this.isCustomerDataSubmitted = false;
    this.isOrderDataSubmitted = false;
  }

  ngOnInit(): void {
    this.getCustomers();
    this.filteredOptions();
    this.getStates(236);
  }

  getCustomers() {
    this._customerService.getJustCustomers(this.token!).subscribe(
      (response) => {
        this.customers = response.customers;
        //console.log(this.customersByVendor);
        this.customersFiltered = this.customers;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    );
  }

  private getStates(country: number) {
    this._stateService.getStates(country).subscribe(
      (response) => {
        this.states = response.states;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    );
  }

  get customerForm() {
    return this.customerData.controls;
  }

  get orderForm() {
    return this.orderData.controls;
  }

  customerSubmit(event: Event) {
    event.preventDefault();
    // console.log(this.customerData.get('name')?.errors);

    if (this.customerData.valid && this.customerSelected) {
      this.wizard.goToNextStep();
    }
    this.isCustomerDataSubmitted = true;
  }

  orderSubmit() {
    if (this.orderData.valid) {
      this.wizard.goToNextStep();
    }
    this.isOrderDataSubmitted = true;
  }

  finishFunction() {
    alert('Successfully Completed');
  }

  displayFnCust(customer: Customer): string {
    return customer ? customer.business : '';
  }

  OnCustomerSelected(option: MatOption) {
    this.customerSelected = option.value;
    this.setFormCustomerData();
  }

  filteredOptions() {
    this.filCustomers = this.controlCustomer.valueChanges.pipe(
      startWith(''),
      map((val) => (typeof val === 'string' ? val : val.business)),
      map((value) => this._filterCustomers(value))
    );
  }

  private setFormCustomerData() {
    this.customerData.patchValue({
      user_id: this.id,
      name: this.customerSelected?.name,
      phone: this.utils.formatPhoneToShow(this.customerSelected?.phone),
      email: this.customerSelected?.email,
      customer_id: this.customerSelected?.id,
      shipping_address: this.customerSelected?.address,
      shipping_state_id: this.customerSelected?.state_id,
      shipping_zipcode: this.customerSelected?.zipcode,
      address_on_product: this.customerSelected?.address,
    });
    this.customerData.enable();
  }

  public changeToOfficeAddress() {
    this.customerData.patchValue({
      shipping_address: '203 Chickamauga Ave Rossville',
      shipping_state_id: 43,
      shipping_zipcode: '30741',
    });
  }

  private _filterCustomers(value: string): Customer[] {
    const formatVal = value.toLowerCase();

    return this.customersFiltered.filter((customer) =>
      customer.business?.toLowerCase().includes(formatVal)
    );
  }

  public addProductReceiver(
    product: OrderProductUniforms | OrderProductGeneral
  ) {
    this.productsOrder.push(product);
    console.log(this.productsOrder);
  }
}
