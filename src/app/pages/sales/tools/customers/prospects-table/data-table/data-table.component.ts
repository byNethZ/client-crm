import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Customer_Type, Prospect } from 'src/app/models/customer.interface';
import { User } from 'src/app/models/user.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  public prospects: Prospect[] = [];
  public token: string | null = localStorage.getItem('token');
  public role: string | null = localStorage.getItem('role_id');

  public departaments: Customer_Type[] = [];
  public users: User[] = [];

  public interests: String[] = [];
  public idCustomerSelected: number;

  basicModalCloseResult: string = '';

  @Input() status: number;
  @Output() lengthData = new EventEmitter<number>();

  constructor(
    private _customerService: CustomerService,
    private _userService: UserService,
    private _modalService: NgbModal,
    private _router: Router,
    private _productService: ProductService,
  ) {
    this.idCustomerSelected = 1;
  }

  ngOnInit(): void {
    this.getCustomerData();
    this.getDepartaments();
    this.getUsers();
  }

  getCustomerData(){
    this._customerService.getCustomersByStatus(this.token!, this.status).subscribe(
      response => {
        //console.log(response.customers);
        //this.prospects = response.customers;
        this.parseData(response.customers)


      },
      error => {
        console.log(error);

      }
    )
  }

  getDepartaments(){
    this._productService.getProductCategories(this.token!).subscribe(
      response => {
        //console.log(response);
        this.departaments = response;
        //console.log(this.departaments);


      },
      error => {
        console.log(error);

      }
    )
  }

  getUsers(){
    this._userService.getUsers(this.token!).subscribe(
      response => {
        //console.log(response)
        this.users = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  parseData(data: any){
    data.map( (prospect: Prospect) => {
      if(prospect.interests !== null && typeof prospect.interests.interests === 'string'){
        prospect.interests.interests = JSON.parse(prospect.interests.interests);
      }
    })
    this.prospects = data;
    this.setLength();

  }

  interestToString(data: any): string{
    let interestString: string = '';
    if(data !== null){
      data.map( (interest: string | number ) => {
        let department: any;
        interest = Number(interest);
        department = this.departaments.find((element: any) => element.id === interest)
        interestString = interestString.concat(`${department?.category}<br>`);
        //console.log(interestString);
      })
    }


    return interestString
  }

  redirectFB(link: string){
    window.open(link);
  }

  openBasicModal(content: TemplateRef<any>, id: number) {
    this.idCustomerSelected = id;

    this._modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  changeStatus(status: number){

    this._customerService.changeStatus(this.idCustomerSelected, status, this.token!).subscribe(
      response => {
        this.getCustomerData();
        this._modalService.dismissAll();
        //console.log(response)

      },
      error => {
        console.log(error);

      }
    )

  }

  toLink(id: number){
    this._router.navigate([`/tools/customer/${id}`]);
  }

  showVendor(id: number | undefined | null): string{
    let vendorName: string = 'Vendor Name';
    if(id !== undefined){
      let result: any
      result = this.users.find((user: any) => user.id === id);
      //console.log(result)
      vendorName = result !== undefined ? `Asesor: ${result?.name}` : '';
    }
    return vendorName;
  }

  warningDate(dateUpdated: string, isCreatedDate: boolean): string{
    let time = moment(dateUpdated).fromNow();
    let diffTime = moment().diff(dateUpdated, 'days');

    if( diffTime > 5 && !isCreatedDate ) return time;
    if(diffTime <= 5 && isCreatedDate) return 'Nuevo';

    return '';
  }

  setLength() {
    this.lengthData.emit(this.prospects.length);
  }

}
