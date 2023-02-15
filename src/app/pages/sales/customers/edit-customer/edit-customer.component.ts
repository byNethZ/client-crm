import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.interface';
import { User } from 'src/app/models/user.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomertypesService } from 'src/app/services/customertypes.service';
import { global } from 'src/app/services/global';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { VendorService } from 'src/app/services/vendor.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  public utils = new Utils()
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

  public vendors: User[] = [];
  public marketingsUser:  User[] = []

  public formData = new FormData();
  public imageLink: string = `${global.urlStorageCustomers}/default.jpg`

  constructor(
    fb: FormBuilder,
    private _customerService: CustomerService,
    private _router: Router,
    private _stateService: StateService,
    private _route: ActivatedRoute,
    private _customerTypes: CustomertypesService,
    private _userServices: UserService
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
      country_id: new FormControl(this.customer.country_id, [Validators.required]),
      state_id: new FormControl(this.customer.state_id, [Validators.required]),
      phone: new FormControl(this.customer.phone, [Validators.required]),
      email: new FormControl(this.customer.email),
      website: new FormControl(this.customer.website),
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

  getCustomer() {
    this.idCustomer = this._route.snapshot.paramMap.get('id');

    if (this.idCustomer) {
      this._customerService.getCustomer(this.idCustomer, this.token!).subscribe(
        (response) => {

          this.customer = response.customer;
          this.stateChoosed = response.customer.state_id;

          this.form.setValue({
            status: 5,
            name: this.customer.name,
            business: this.customer.business,
            address: this.customer.address,
            zipcode: this.customer.zipcode,
            city: this.customer.city,
            town: this.customer.town,
            country_id: 236,
            state_id: ''+this.customer.state_id,
            phone: this.customer.phone,
            email: this.customer.email,
            website: this.customer.website,
            vendor_id:this.customer.vendor_id,
            level: this.customer.level,
            type_id: this.customer.type_id,
            token: this.customer.token,
            color: this.customer.color,
            place: this.customer.place,
            hobby: this.customer.hobby,
            movie: this.customer.movie,
            music: this.customer.music,
            bio: this.customer.bio,
            birthplace: this.customer.birthplace,
            sport: this.customer.sport,
            business_number: this.customer.business_number,
            field_1: this.customer.field_1,
            field_2: this.customer.field_2,
            field_3: this.customer.field_3,
            gender: this.customer.gender,
            birthday: this.customer.birthday,
            occupation: this.customer.occupation,
            marital_status: this.customer.marital_status,
            nationality: this.customer.nationality,
            language: this.customer.language,
            fears: this.customer.fears,
            needs: this.customer.needs,
            identity: this.customer.identity,
            dreams: this.customer.dreams,
            goals: this.customer.goals,
            tasks: this.customer.tasks,
            relations: this.customer.relations,
            motivators: this.customer.motivators,
            food: this.customer.food,
            mindset: this.customer.mindset,
            pleasures: this.customer.pleasures,
            finances: this.customer.finances,
            wishes: this.customer.wishes,
            important_dates: this.customer.important_dates,
            challenges: this.customer.challenges,
            responsability: this.customer.responsability,
            demotivators: this.customer.demotivators,
            works: this.customer.works,
            notes: this.customer.notes,
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

        this._router.navigate([`/sales/customer/${this.customer.id}`]);
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

  getCustomerTypes(){
    this._customerTypes.getCustomerTypes(this.token!).subscribe(
      response => {
        this.customerTypes = response;

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
            this.imageLink = `${global.urlStorageCustomers}/${response.newImage}`
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
  }

  changeArrayData(value: string[] | {}, field: string){
    this.customer = { ...this.customer, [field]: JSON.stringify(value)};
    //console.log(this.customer);

  }
}
