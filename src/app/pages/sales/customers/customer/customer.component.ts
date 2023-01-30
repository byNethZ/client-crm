import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.interface';
import { User } from 'src/app/models/user.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public utils = new Utils();
  public idCustomer: string | null = null;
  public token: string = localStorage.getItem('token')!;
  public customer: Customer;
  public users: User[] = [];

  public vendorCustomer: string;
  public assignedBy: string;

  public currentRate : number = 0;
  public category :string;
  public asesor: User;
  public state : string;
  public imageLink: string = `${global.urlStorageCustomers}/default.jpg`
  //https://bliones.net/api/storage/customers/default.jpg

  constructor(
    private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _userService: UserService
  ) {
    this.customer = {
      id: 1,
      status: 1,
      business: '',
      name: '',
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
    }
  }

  ngOnInit(): void {
    this.getCustomerData();

  }

  getUsers(){
    this._userService.getUsers(this.token!).subscribe(
      response => {

        this.setUsersById(response);

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

  getCustomerData(){
    this.idCustomer = this._route.snapshot.paramMap.get('id');

    if(this.idCustomer){
      this._customerService.getCustomer(this.idCustomer, this.token).subscribe(
        response => {
          this.customer = response.customer;
          //console.log(this.customer);
          this.currentRate = this.customer.level;
          this.category = response.category;
          this.asesor = response.asesor;
          this.state = response.state;
          if(this.customer.image){
            this.imageLink = `${global.urlStorageCustomers}/${this.customer.image}`
          }

          this.getUsers();



        },
        error => {
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
      )
    }

  }

  setUsersById(data: User[]){
    let userVendor: User | undefined = data.find( (user: User) => user.id === this.customer.vendor_id);
    let userMarketing: User | undefined;

    if(this.customer.field_2) userMarketing = data.find( (user: User) => user.id === parseInt(this.customer.field_2))

    this.vendorCustomer = userVendor ? userVendor.name : 'Sin datos';
    this.assignedBy = userMarketing ? userMarketing.name : 'Sin datos';

    console.log();
    //console.log(data);

  }
}
