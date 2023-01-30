import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.interface';
import { User } from 'src/app/models/user.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomertypesService } from 'src/app/services/customertypes.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { VendorService } from 'src/app/services/vendor.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './../edit-customer/edit-customer.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  public utils = new Utils();
  public isEdit: boolean = false;
  public form: FormGroup;
  public customer: Customer;

  public vendor_id: string | null = localStorage.getItem('vendor_id');
  public token: string | null = localStorage.getItem('token');
  public role: number = parseInt(localStorage.getItem('role_id')!);
  public imageLink: string = 'http://localhost:8000/storage/customers/default.jpg'

  public states: any[] = [];
  public countryChoosed: number = 1;

  public vendors: User[] = [];
  public marketingsUser:  User[] = []

  public customerTypes: any[] = [];
  public tokenGenerated: string;

  constructor(
    private _stateService: StateService,
    private _userServices: UserService,
    private _customerTypes: CustomertypesService,
    private _customerService: CustomerService,
    private _router: Router
  ) {
    this.tokenGenerated = this.generateToken();
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
      occupation: '',
      marital_status: 1,
      nationality: 1,
      language: 1,
      fears: '',
      emotions: '',
      needs: '',
      identity: '',
      dreams: '',
      goals: '',
      tasks: '',
      relations: '',
      values: '',
      motivators: '',
      beliefs: '',
      mind: '',
      food: '',
      personality: '',
      mindset: '',
      pleasures: '',
      finances: '',
      wishes: '',
      important_dates: '',
      challenges: '',
      responsability: '',
      demotivators: '',
      works: '',
      notes: '',
      image: '',
      created_at: '',
      updated_at: '',
    };
    this.form = new FormGroup({
      status: new FormControl(5, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      business: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      country_id: new FormControl(236, [Validators.required]),
      state_id: new FormControl(1, [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      website: new FormControl(''),
      vendor_id: new FormControl(this.vendor_id ? this.vendor_id : 2, [
        Validators.required,
      ]),
      level: new FormControl(1, [Validators.required]),
      type_id: new FormControl(1, [Validators.required]),
      token: new FormControl(this.tokenGenerated, [Validators.required]),
      color: new FormControl(''),
      place: new FormControl(''),
      hobby: new FormControl(''),
      movie: new FormControl(''),
      music: new FormControl(''),
      bio: new FormControl(''),
      birthplace: new FormControl(''),
      sport: new FormControl(''),
      business_number: new FormControl(''),
      field_1: new FormControl(''),
      field_2: new FormControl(''),
      field_3: new FormControl(''),
      gender: new FormControl(''),
      birthday: new FormControl(''),
      occupation: new FormControl(''),
      marital_status: new FormControl(1),
      nationality: new FormControl(1),
      language: new FormControl(1),
      fears: new FormControl(''),
      needs: new FormControl(''),
      identity: new FormControl(''),
      dreams: new FormControl(''),
      goals: new FormControl(''),
      tasks: new FormControl(''),
      relations: new FormControl(''),
      motivators: new FormControl(''),
      food: new FormControl(''),
      mindset: new FormControl(''),
      pleasures: new FormControl(''),
      finances: new FormControl(''),
      wishes: new FormControl(''),
      important_dates: new FormControl(''),
      challenges: new FormControl(''),
      responsability: new FormControl(''),
      demotivators: new FormControl(''),
      works: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getVendors();
    this.getCustomerTypes();
    this.getStates(236);
  }

  save(evt: Event) {
    evt.preventDefault();

    this.customer.name = this.form.value.name;
    this.customer.status = parseInt(this.form.value.status);
    this.customer.business = this.form.value.business;
    this.customer.address = this.form.value.address;
    this.customer.zipcode = this.form.value.zipcode;
    this.customer.country_id = parseInt(this.form.value.country_id);
    this.customer.state_id = parseInt(this.form.value.state_id);
    this.customer.city = this.form.value.city;
    this.customer.town = this.form.value.town;
    this.customer.phone = this.utils.formatPhone(this.form.value.phone) ? this.utils.formatPhone(this.form.value.phone) : 'N/A';
    this.customer.email = this.form.value.email;
    this.customer.website = this.form.value.website;
    this.customer.vendor_id = parseInt(this.form.value.vendor_id);
    this.customer.level = parseInt(this.form.value.level);
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
    this.customer.occupation = this.form.value.occupation;
    this.customer.marital_status = parseInt(this.form.value.marital_status);
    this.customer.nationality = parseInt(this.form.value.nationality);
    this.customer.language = parseInt(this.form.value.language);
    this.customer.fears = this.form.value.fears;
    this.customer.needs = this.form.value.needs;
    this.customer.identity = this.form.value.identity;
    this.customer.dreams = this.form.value.dreams;
    this.customer.goals = this.form.value.goals;
    this.customer.tasks = this.form.value.tasks;
    this.customer.relations = this.form.value.relations;
    this.customer.motivators = this.form.value.motivators;
    this.customer.food = this.form.value.food;
    this.customer.mindset = this.form.value.mindset;
    this.customer.pleasures = this.form.value.pleasures;
    this.customer.finances = this.form.value.finances;
    this.customer.wishes = this.form.value.wishes;
    this.customer.important_dates = this.form.value.important_dates;
    this.customer.challenges = this.form.value.challenges;
    this.customer.responsability = this.form.value.responsability;
    this.customer.demotivators = this.form.value.demotivators;
    this.customer.works = this.form.value.works;
    this.customer.notes = this.form.value.notes;

    this._customerService.save(this.customer, this.token!).subscribe(
      (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido creado',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        let id = response.customerCreated.id;
        this._router.navigate([`/sales/customer/${id}`]);
      },
      (error) => {
        console.error(error);
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

  getVendors(){
    this._userServices.getUsers(this.token!).subscribe(
      response => {

        //this.vendors = response;
        //console.log(response);
        this.vendors = this.utils.getVendorsUsers(response);
        this.marketingsUser = this.utils.getMarketingUsers(response);

      },
      error => {
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
    )
  }

  getCustomerTypes() {
    this._customerTypes.getCustomerTypes(this.token!).subscribe(
      (response) => {
        this.customerTypes = response;
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
          showCloseButton: true
        });
      }
    );
  }

  chooseCountry(event?: Event) {
    this.countryChoosed = parseInt(this.form.value.country_id);

    this.getStates(this.countryChoosed);
  }

  enlaceCuestionario() {
    //console.log(`enlace copiado con el token: ${this.tokenGenerated}`);
    //https://bliones.net/form/
    if (this.customer.token === 'N/A' || !this.customer.token) {
      navigator.clipboard.writeText(
        `https://bliones.net/form/${this.tokenGenerated}`
      );
    } else {
      navigator.clipboard.writeText(
        `https://bliones.net/form/${this.customer.token}`
      );
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

  random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
  }

  generateToken() {
    return this.random();
  }

  formatDate(evt: Event): string {

    let inputDate: any = evt;

    let arrayDate = inputDate.split('-');

    let date = new Date(
      parseInt(arrayDate[0]),
      parseInt(arrayDate[1]) - 1,
      parseInt(arrayDate[2])
    );
    return inputDate ? date.toISOString() : '';
  }

  onFileChange($event: Event){}

  changeArrayData(value: string[] | {}, field: string){
    this.customer = { ...this.customer, [field]: JSON.stringify(value)};
    //console.log(this.customer);

  }

}
