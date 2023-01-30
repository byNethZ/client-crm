import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { PanelService } from 'src/app/services/panel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public token: string = localStorage.getItem('token')!;
  public users: User[] = [];
  public idUser: string = '2';
  public modeReport: string = 'day';

  constructor(
    private _userService: UserService,
    private _panelService: PanelService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers(this.token).subscribe({
      next: (response) => this.users = response.filter( ( user: User ) => user.role_id === 1),
      error: (error) => {
        console.log(error)
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true
        });
      },
    })
  }

  sendReport(){
    this._panelService.sendReport(this.modeReport, parseInt(this.idUser), this.token).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Se ha mandado correctamente el reporte',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      },
    })
  }

}
