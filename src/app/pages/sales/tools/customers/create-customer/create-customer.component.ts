import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
import { map, Observable, startWith } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomertypesService } from 'src/app/services/customertypes.service';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  public errorMessage: string | boolean = false;
  public typeCustomer: FormGroup;
  formData: FormGroup;
  formDepartaments: FormGroup;

  public customer: Customer;
  public vendor_id: string | null = localStorage.getItem('vendor_id')
    ? localStorage.getItem('vendor_id')
    : '10';
  public token: string | null = localStorage.getItem('token');
  public departament_id: number | null = parseInt(
    localStorage.getItem('departament_id')!
  );

  //autocomplete
  controlCust = new FormControl();
  public filterValue: string;
  filCustomers: Observable<Customer[]> = new Observable();
  public customerSelected: Customer | null = null;

  public customerTypes: any[];
  public departaments: any[] = [];
  public vendors: any[] = [];

  public arrayInterests: any[] = [];

  public customers: Customer[] = [];
  public customersFiltered: Customer[] = [];

  public isProspect: boolean = false;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  constructor(
    fb: FormBuilder,
    private _customerService: CustomerService,
    private _router: Router,
    private _customerTypes: CustomertypesService,
    private _productService: ProductService,
    private _vendorService: VendorService,
    private _fb: FormBuilder
  ) {
    this.customer = {
      id: 1,
      status: 1,
      name: '',
      business: '',
      surname: '',
      address: '',
      zipcode: '',
      country_id: 1,
      state_id: 1,
      city: '',
      town: '',
      phone: '',
      email: '',
      website: '',
      vendor_id: parseInt(this.vendor_id!),
      level: 1,
      type_id: 1,
      token: this.generateToken(),
      color: '',
      place: '',
      hobby: '',
      movie: '',
      music: '',
      bio: '',
      birthplace: '',
      sport: '',
      business_number: '',
      field_1: '',
      field_2: '',
      field_3: '',
      birthday: '',
      gender: '',
      image: '',
      created_at: '',
      updated_at: ''
    };
    this.formDepartaments = fb.group({
      selectedDepartaments: new FormArray([]),
    });
    this.typeCustomer = new FormGroup({
      type_id: new FormControl(),
    });
    this.formData = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl(''),
      socialProfile: new FormControl(''),
      vendor_id: new FormControl('10', Validators.required),
      origin: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  getVendors() {
    this._vendorService.getVendors(this.token!).subscribe(
      (response) => {
        this.vendors = response;
        //console.log(this.vendors);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDepartaments() {
    this._productService.getProductCategories(this.token!).subscribe(
      (response) => {
        this.departaments = response;
        //console.log(this.departaments)

      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCustomers() {
    this._customerService.getCustomers(this.token!).subscribe(
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

    return this.customers.filter((customer) =>
      customer.business?.toLowerCase().includes(formatVal)
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
  onCheckChange(event: any) {
    const selectedDepartaments = this.formDepartaments.controls[
      'selectedDepartaments'
    ] as FormArray;

    if (event.target.checked) {
      selectedDepartaments.push(new FormControl(event.target.value));
    } else {
      const index = selectedDepartaments.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedDepartaments.removeAt(index);
    }

    //console.log(this.formDepartaments.value.selectedDepartaments);
  }

  getErrorMessage(message: string | boolean) {
    if (message !== false) {
      this.errorMessage = message;
    } else {
      this.errorMessage = false;
    }
  }

  save(event: Event, status: number = 0) {
    event.preventDefault();

    this.customer.name = this.formData.value.name;
    this.customer.phone = this.formData.value.phone;
    this.customer.email = this.formData.value.email;
    this.customer.type_id = parseInt(this.typeCustomer.value.type_id);
    this.customer.field_1 = this.formData.value.socialProfile;
    this.customer.field_3 = this.formData.value.origin;
    this.customer.status = status;
    this.customer.vendor_id = this.departament_id === 2
      ? this.formData.value.vendor_id
      : this.vendor_id;

    this.arrayInterests = this.formDepartaments.value.selectedDepartaments;

    if (this.customer.token === 'N/A' || !this.customer.token) {
      this.customer.token = this.generateToken();
    }

    //field_2 represents is Assigned by Digital departament
    if(this.departament_id === 2 ){
      this.customer.field_2 = '1';
    }

    let data = {
      customer: this.customer,
      interests: this.arrayInterests,
    };

    //console.log(data);

    this._customerService.save(data, this.token!).subscribe(
      (response) => {
        //console.log(response);
        this.wizard.goToNextStep();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido creado',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        //this._router.navigate([`/tools/customer/${this.customer.id}`]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
  }

  generateToken() {
    return this.random();
  }

  getCustomerTypes() {
    this._customerTypes.getCustomerTypes(this.token!).subscribe(
      (response) => {
        this.customerTypes = response;
        //console.log(this.customerTypes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  defineProspect(resp: boolean) {
    this.isProspect = resp;
    if (this.isProspect) {
      this.getCustomerTypes();
      this.getDepartaments();
      this.getVendors();
    } else {
      this.getCustomers();
      this.filCustomers = this.controlCust.valueChanges.pipe(
        startWith(''),
        map((val) => (typeof val === 'string' ? val : val.business)),
        map((business) =>
          business ? this._filterCustomers(business) : this.customers.slice()
        )
      );
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  newRegister() {
    this.reloadCurrentRoute();
  }

  verifyStepTwo() {
    if (this.isProspect) {
      let lenghtArrayForm =
        this.formDepartaments.value.selectedDepartaments.length;

      if (lenghtArrayForm > 0) {
        this.wizard.goToNextStep();
        this.getErrorMessage(false);
      } else {
        this.getErrorMessage('Debes seleccionar al menos un departamento');
      }
    } else {

      if(this.customerSelected !== null){

        this.wizard.goToNextStep();
        //console.log(this.customerSelected);
        this.getDepartaments();
        this.getErrorMessage(false);

      } else {
        this.getErrorMessage('Debes seleccionar un cliente');
      }
    }
  }

  verifyStepThree(){
    if(this.isProspect){
      if(this.typeCustomer.value.type_id){
        this.getErrorMessage(false);
        this.wizard.goToNextStep();

      } else {
        this.getErrorMessage('Debes seleccionar la industria del cliente');
      }

    } else {
      let lenghtArrayForm = this.formDepartaments.value.selectedDepartaments.length;

      if(lenghtArrayForm > 0){
        this.getErrorMessage(false);
        this.arrayInterests = this.formDepartaments.value.selectedDepartaments

        let id = this.customerSelected?.id;
        if(id){
          this._customerService.updateInterests( id, this.arrayInterests, this.token!).subscribe(
            response => {
              //console.log(response);
              this.wizard.goToNextStep();
              this.wizard.completed;
              this.wizard.goToNextStep();

            },
            error => {
              console.log(error);

            }
          )
        }

      } else {
        this.getErrorMessage('Debes seleccionar al menos un departamento');
      }

    }
  }
}
