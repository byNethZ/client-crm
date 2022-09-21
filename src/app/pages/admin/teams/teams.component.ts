import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public users: any[] = [];
  public usersFiltered: any[] = [];
  public token: string = localStorage.getItem('token')!;
  public role: number = parseInt(localStorage.getItem('role_id')!);
  public filterValue: string;

  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._userService.getUsers(this.token).subscribe(
      response => {
        this.users = response;
        this.usersFiltered = this.users;
        //console.log(this.users);

      },
      error => {
        console.log(error);
      }
      )

    }

    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      //console.log(this.filterValue);
      let filterValueLower = this.filterValue.toLowerCase();
      if(this.filterValue === '' ) {
          this.usersFiltered = this.users;
      }
      else {
        this.usersFiltered = this.users.filter((user) => user.name.toLowerCase().includes(filterValueLower,-1))
      }

    }

    deleteUser(id: string){

      Swal.fire({
        title: 'Confirmación',
        text: "Se eliminirá el registro al usuario ¿Continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar usuario',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this._userService.delete(id, this.token).subscribe(
            response => {

              this.getUser();
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'El usuario ha sido eliminado',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              })

            },
            error => {
              console.log(error);

            }
          )
        }
      })

    }
}
