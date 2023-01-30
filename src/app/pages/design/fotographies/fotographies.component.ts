import { Component, OnInit } from '@angular/core';
import { FotographyService } from 'src/app/services/fotography.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotographies',
  templateUrl: './fotographies.component.html',
  styleUrls: ['./fotographies.component.scss']
})
export class FotographiesComponent implements OnInit {

  public token: string | null = localStorage.getItem('token');

  public checklist: any[] = [];
  public checklistFiltered: any[] = []

  public filteredValue : string;

  constructor(
    private _fotographiesService: FotographyService
  ) { }

  ngOnInit(): void {
    this.getChecklist();
  }

  getChecklist(){
    this._fotographiesService.getChecklist().subscribe(
      response =>{
        this.checklist = response;
        this.checklistFiltered = this.checklist;

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

  applyFilter(event: Event){
    this.filteredValue = (event.target as HTMLInputElement).value;
    let filteredValueLower = this.filteredValue.toLowerCase();

    if(this.filteredValue === ''){
      this.checklistFiltered = this.checklist;
    } else{
      this.checklistFiltered = this.checklist.filter((check) => check.restaurante.toLowerCase().includes(filteredValueLower, -1));
    }
  }

  deleteCheck(id: number){
    Swal.fire({
      title: 'Confirmación',
      text: "Se eliminirá el registro de este checklist ¿Continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._fotographiesService.delete(id, this.token!).subscribe(
          response => {

            this.getChecklist();
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'El checklist ha sido eliminado',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })

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
    })
  }

}
