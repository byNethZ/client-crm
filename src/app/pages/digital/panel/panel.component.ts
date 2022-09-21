import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public token: string = localStorage.getItem('token')!;
  public users: User[]= [];
  public idUser: string = '99';

  constructor(
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers(this.token).subscribe(
      response => {
        //console.log(response)
        this.users = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  activate(){
    this._userService.activateSystem(this.token, this.idUser).subscribe(
      response => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Se ha mandado correctamente el mensaje',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      },
      error => {
        console.log(error)
      }
    )
  }

}
