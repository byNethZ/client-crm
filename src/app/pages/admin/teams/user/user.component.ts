import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public idUser: string | null;
  public token: string = localStorage.getItem('token')!;
  public user: User;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.user = {
      name: '',
      lastname: '',
      email: '',
      role_id: 1,
      departament_id: 1,
      departament_alt_id: 0,
      password: '',
      personal_phone: '',
      public_phone: '',
      token: '',
      id: 1,
      avatar: ''
    }
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.idUser = this._route.snapshot.paramMap.get('id');
    if(this.idUser){
      this._userService.getUser(this.idUser, this.token).subscribe(
        response => {

          this.user = response.user

        },
        error => {
          console.log(error);

        }
      )
    }
  }

}
