import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.interface';
import { User } from 'src/app/models/user.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public idCustomer: string | null = null;
  public token: string = localStorage.getItem('token')!;
  public customer: Customer;
  public currentRate : number = 0;
  public category :string;
  public asesor: User;
  public state : string;
  public imageLink: string = `${global.urlStorageCustomers}/default.jpg`
  //https://bliones.net/api/storage/customers/default.jpg

  constructor(
    private _route: ActivatedRoute,
    private _customerService: CustomerService
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
      image: '',
      created_at: '',
      updated_at: ''
    }
  }

  ngOnInit(): void {
    this.getCustomerData();

  }

  getCustomerData(){
    this.idCustomer = this._route.snapshot.paramMap.get('id');

    if(this.idCustomer){
      this._customerService.getCustomer(this.idCustomer, this.token).subscribe(
        response => {
          this.customer = response.customer;
          this.currentRate = this.customer.level;
          this.category = response.category;
          this.asesor = response.asesor;
          this.state = response.state;
          if(this.customer.image){
            this.imageLink = `${global.urlStorageCustomers}/${this.customer.image}`
          }



        },
        error => {
          console.error();
        }
      )
    }

  }
}
