import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomertypesService } from 'src/app/services/customertypes.service';
import { global } from 'src/app/services/global';
import { StateService } from 'src/app/services/state.service';
import { VendorService } from 'src/app/services/vendor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  public isEdit: boolean = true;
  public idCustomer: string | null = null;
  form: FormGroup;
  public customer: Customer;
  public vendor_id: string | null = localStorage.getItem('vendor_id');
  public token: string | null = localStorage.getItem('token');
  public role: number = parseInt(localStorage.getItem('role_id')!);
  public tokenCustomer: any;
  public countryChoosed: number = 1;
  public stateChoosed: number = 1;
  public states: any[] = [];
  public customerTypes: any[];
  public color: string = '#ffffff';
  public tokenGenerated: string;
  public btnString: string = 'Editar';
  public vendors: any[] = [];
  public formData = new FormData();
  public imageLink: string = `${global.urlStorageCustomers}/default.jpg`

  constructor(
    fb: FormBuilder,
    private _customerService: CustomerService,
    private _router: Router,
    private _stateService: StateService,
    private _route: ActivatedRoute,
    private _customerTypes: CustomertypesService,
    private _vendorService: VendorService
  ) {
    this.customer = {
      id: 1,
      status: 5,
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
      vendor_id: 1,
      level: 1,
      type_id: 1,
      token: '',
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
    this.tokenCustomer = this.generateToken();
    this.form = new FormGroup({
      status: new FormControl(5, [Validators.required]),
      name: new FormControl(this.customer.name, [Validators.required]),
      business: new FormControl(this.customer.business, [Validators.required]),
      address: new FormControl(this.customer.address, [Validators.required]),
      zipcode: new FormControl(this.customer.zipcode, [Validators.required]),
      city: new FormControl(this.customer.city, [Validators.required]),
      town: new FormControl(this.customer.town, [Validators.required]),
      country_id: new FormControl(this.customer.country_id),
      state_id: new FormControl(this.customer.state_id),
      phone: new FormControl(this.customer.phone, [Validators.required]),
      email: new FormControl(this.customer.email, [Validators.required]),
      website: new FormControl(this.customer.website, [Validators.required]),
      vendor_id: new FormControl(this.customer.vendor_id, [
        Validators.required,
      ]),
      level: new FormControl(this.customer.level, [Validators.required]),
      type_id: new FormControl(this.customer.type_id, [Validators.required]),
      token: new FormControl(this.customer.token, [Validators.required]),
      color: new FormControl(this.customer.color),
      place: new FormControl(this.customer.place),
      hobby: new FormControl(this.customer.hobby),
      movie: new FormControl(this.customer.movie),
      music: new FormControl(this.customer.music),
      bio: new FormControl(this.customer.bio),
      birthplace: new FormControl(this.customer.birthplace),
      sport: new FormControl(this.customer.sport),
      business_number: new FormControl(this.customer.business_number),
      field_1: new FormControl(this.customer.field_1),
      field_2: new FormControl(this.customer.field_2),
      field_3: new FormControl(this.customer.field_3),
      gender: new FormControl(this.customer.gender),
      birthday: new FormControl(this.customer.birthday),

    });
    const image = new FormData();
    this.tokenGenerated = this.generateToken();
  }

// color
// place
// hobby
// movie
// music
// bio
// birthplace
// sport
// business_number
// field_1
// field_2
// field_3

  ngOnInit(): void {
    this.getCustomer();
    this.getVendors();
  }

  getVendors(){
    this._vendorService.getVendors(this.token!).subscribe(
      response => {

        this.vendors = response;

      },
      error => {
        console.log(error);

      }
    )
  }

  getCustomer() {
    this.idCustomer = this._route.snapshot.paramMap.get('id');

    if (this.idCustomer) {
      this._customerService.getCustomer(this.idCustomer, this.token!).subscribe(
        (response) => {

          this.customer = response.customer;
          this.stateChoosed = response.customer.state_id;
          this.form = new FormGroup({
            status: new FormControl(5, [
              Validators.required,
            ]),
            name: new FormControl(this.customer.name, [Validators.required]),
            business: new FormControl(this.customer.business, [
              Validators.required,
            ]),
            address: new FormControl(this.customer.address, [
              Validators.required,
            ]),
            zipcode: new FormControl(this.customer.zipcode, [
              Validators.required,
            ]),
            city: new FormControl(this.customer.city, [Validators.required]),
            town: new FormControl(this.customer.town),
            country_id: new FormControl(''+this.customer.country_id, [Validators.required]),
            state_id: new FormControl(''+this.customer.state_id, [Validators.required]),
            phone: new FormControl(this.customer.phone, [Validators.required]),
            email: new FormControl(this.customer.email, [Validators.required]),
            website: new FormControl(this.customer.website, [Validators.required]),
            vendor_id: new FormControl('' + this.customer.vendor_id, [
              Validators.required,
            ]),
            level: new FormControl('' + this.customer.level, [
              Validators.required,
            ]),
            type_id: new FormControl(this.customer.type_id, [
              Validators.required,
            ]),
            token: new FormControl(this.customer.token, [Validators.required]),
            color: new FormControl(this.customer.color),
            place: new FormControl(this.customer.place),
            hobby: new FormControl(this.customer.hobby),
            movie: new FormControl(this.customer.movie),
            music: new FormControl(this.customer.music),
            bio: new FormControl(this.customer.bio),
            birthplace: new FormControl(this.customer.birthplace),
            sport: new FormControl(this.customer.sport),
            business_number: new FormControl(this.customer.business_number),
            field_1: new FormControl(this.customer.field_1),
            field_2: new FormControl(this.customer.field_2),
            field_3: new FormControl(this.customer.field_3),
            gender: new FormControl(this.customer.gender),
            birthday: new FormControl(this.customer.birthday),

          });
          this.chooseCountry();
          this.getCustomerTypes();
          //console.log(this.customer)

          if(this.customer.image){
            this.imageLink = `${global.urlStorageCustomers}/${this.customer.image}`
          }

        },
        (error) => {
          console.error();
        }
      );
    }
  }

  getErrorMessage() {
    return 'Este campo es obligatorio';
  }

  onSubmit() {}
  save(event: Event) {
    event.preventDefault();

    this.customer.name = this.form.value.name;
    this.customer.status = parseInt(this.form.value.status);
    this.customer.business = this.form.value.business;
    this.customer.address = this.form.value.address;
    this.customer.zipcode = this.form.value.zipcode;
    this.customer.country_id = parseInt(this.form.value.country_id);
    this.customer.state_id = parseInt(this.form.value.state_id);
    this.customer.city = this.form.value.city;
    this.customer.town = this.form.value.town;
    this.customer.phone = this.form.value.phone;
    this.customer.email = this.form.value.email;
    this.customer.website = this.form.value.website;
    this.customer.vendor_id = parseInt(this.form.value.vendor_id);
    this.customer.level = this.form.value.level;
    this.customer.type_id = parseInt(this.form.value.type_id);
    this.customer.token = this.form.value.token;
    this.customer.color = this.form.value.color;
    this.customer.place = this.form.value.place;
    this.customer.hobby = this.form.value.hobby;
    this.customer.movie = this.form.value.movie;
    this.customer.music = this.form.value.music;
    this.customer.bio = this.form.value.bio;
    this.customer.birthplace = this.form.value.birthplace;
    this.customer.sport = this.form.value.sport;
    this.customer.business_number = this.form.value.business_number;
    this.customer.field_1 = this.form.value.field_1;
    this.customer.field_2 = this.form.value.field_2;
    this.customer.field_3 = this.form.value.field_3;
    this.customer.birthday = this.formatDate(this.form.value.birthday);
    this.customer.gender = this.form.value.gender;

    if(this.customer.token === 'N/A' || !this.customer.token || this.customer.token === '') {
      this.customer.token = this.tokenGenerated;
    }

    //console.log(this.customer)


    this._customerService.update(parseInt(this.idCustomer!), this.customer, this.token!).subscribe(
      (response) => {

        //console.log(response)

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido actualizado',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        this._router.navigate([`/tools/customer/${this.customer.id}`]);
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

  private getStates(country: number) {
    this._stateService.getStates(country).subscribe(
      (response) => {

        this.states = response.states;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  chooseCountry(event?: Event) {
    this.countryChoosed = parseInt(this.form.value.country_id);


    this.getStates(this.countryChoosed);
  }

  getCustomerTypes(){
    this._customerTypes.getCustomerTypes(this.token!).subscribe(
      response => {
        this.customerTypes = response;

      },
      error => {
        console.log(error);

      }
    )
  }

  enlaceCuestionario(){
    //console.log(`enlace copiado con el token: ${this.tokenGenerated}`);
    //https://bliones.net/form/
    if(this.customer.token === 'N/A' || !this.customer.token) {
      navigator.clipboard.writeText(`https://bliones.net/form/${this.tokenGenerated}`);
    }else{
      navigator.clipboard.writeText(`https://bliones.net/form/${this.customer.token}`);
    }
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Enlace copiado al portapapeles',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

  }

  formatDate(evt: Event): string {

    let inputDate: any = evt;

    if(inputDate){
      let arrayDate = inputDate.split('-');

      let date = new Date(
        parseInt(arrayDate[0]),
        parseInt(arrayDate[1]) - 1,
        parseInt(arrayDate[2])
      );

      return date.toISOString();
    }
    return '';
  }

  onFileChange(event: any) {
    const image:File = event.target.files[0];

    if (image) {

        this.formData.append("image", image);

        this._customerService.uploadImage(this.token!, this.customer.id, this.formData).subscribe(
          response => {
            //console.log(response)
            this.imageLink = `${global.urlStorageCustomers}/${response}`
          },
          error => {
            console.log(error)
          }
        )
    }
  }
}
