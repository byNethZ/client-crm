import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Customer_Type, Prospect } from 'src/app/models/customer.interface';
import { User } from 'src/app/models/user.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  public prospects: Prospect[] = [];
  public token: string | null = localStorage.getItem('token');
  public role: string | null = localStorage.getItem('role_id');
  public utils = new Utils();

  public departaments: Customer_Type[] = [];
  public users: User[] = [];

  public interests: String[] = [];
  public idCustomerSelected: number;
  public notesIdCustomerSelected: string = '';

  basicModalCloseResult: string = '';

  @Input() status: number;
  @Input() isRejectedTable: boolean = false;
  @Output() lengthData = new EventEmitter<number>();
  @Output() id = new EventEmitter<number>()

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
        console.log(response.customers);
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

  openBasicModal(content: TemplateRef<any>, id: number, xl = false) {
    this.idCustomerSelected = id;
    let params = {};

    if(xl) params = {size: 'lg', centered: true}

    this._modalService.open(content, params).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  openRejectModal(contentCurrent: TemplateRef<any>){
    this._modalService.dismissAll();

    this._modalService.open(contentCurrent, {}).result.then((result) => {
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

  showVendor(id: number | undefined | null | string ): string{
    let vendorName: string = 'Vendor Name';
    if(id !== undefined || id !== null){
      if(typeof id === 'string') id = parseInt(id);
      let result: any
      result = this.users.find((user: any) => user.id === id);
      //console.log(id)
      vendorName = result !== undefined ? `${result?.name}` : '';
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

  sendNotes(){
    this._modalService.dismissAll();
    console.log(this.notesIdCustomerSelected);
    let request = { notes: this.notesIdCustomerSelected}
    this._customerService.prospectRejected(this.idCustomerSelected, request, this.token!).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido actualizado',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        this.notesIdCustomerSelected = '';
        this.getCustomerData();
      },
      error: (error) => console.log(error)
    })
  }

  getNotes(id: number): string{
    let note: string = '';
    let prospectSearched = this.prospects.find( (prospect) => prospect.id === id);
    if(prospectSearched) return note = prospectSearched.notes;
    return note;
  }

  openFatherModal(id: number){
    this.id.emit(id);
  }

}
