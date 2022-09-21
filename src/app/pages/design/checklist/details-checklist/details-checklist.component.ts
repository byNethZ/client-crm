import { Component, Input, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.interface';
import { LinksService } from 'src/app/services/links.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-checklist',
  templateUrl: './details-checklist.component.html',
  styleUrls: ['./details-checklist.component.scss']
})
export class DetailsChecklistComponent implements OnInit {
  public token : string = localStorage.getItem('token')!;
  public id : string = localStorage.getItem('id')!;
  public links : any[];
  public linksFiltered : any[];

  public filteredValue : string;
  public role_id: number = parseInt(localStorage.getItem('role_id')!);

  @Input() isAll: boolean;
  @Input() status: number|string;

  constructor(
    private _linkService : LinksService
  ) { }

  ngOnInit(): void {
    this.getLinks();
    //console.log(this.isAll)
  }

  getLinks(){
    if(this.isAll){
      this._linkService.getLinks(this.token, this.id).subscribe(
        response => {
          this.links = response.links;
          this.linksFiltered = this.links;
          console.log(response)

        },
        error => {
          console.log(error);

        }
      )
    } else {
      this._linkService.getLinksByStatus(this.token, this.id, this.status).subscribe(
        response => {
          this.links = response.links;
          this.linksFiltered = this.links;
          //console.log(response)

        },
        error => {
          console.log(error);

        }
      )
    }
  }

  applyFilter(event: Event) {
    this.filteredValue = (event.target as HTMLInputElement).value;
    let filteredValueLower = this.filteredValue.toLowerCase();
    if(this.filteredValue === '' ) {
        this.linksFiltered = this.links;
    }
    else {
      this.linksFiltered = this.links.filter((link) => link.customer.toLowerCase().includes(filteredValueLower,-1))
    }

  }

  deleteLink(id:any){

    Swal.fire({
      title: 'Este simbolo significa Peligro!!',
      text: "Estás a punto de eliminar un pobre registro que no te ha hecho nada ¿Podrás dormir con la conciencia tranquila después de esto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '#YOLO',
      cancelButtonText: 'Noo, cancela!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._linkService.deleteLink(id, this.token).subscribe(
          response => {

            this.getLinks();
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'El link ha sido eliminado y es tu culpa \n :(',
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

  resetLink(id:string){
    this._linkService.changeStatusLink(id, this.token).subscribe(
      response => {
        this.getLinks();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El link ha sido reseteado exitosamente',
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

  copyLink(id:string){
    if (!navigator.clipboard) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'El navegador no permite copiar el link',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
      return;
    }
    navigator.clipboard.writeText(`https://bliones.net/checklist-menus/cust/?check=${id}`).then(
      (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El link se copió al portapapeles',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
    },
    (err) => {
      console.error('Async: Could not copy text: ', err);
    });
  }

  setClass(status: number): string{
    let classStyle: string = '';
    if( status === 0 ) return classStyle = 'pendiente';
    if( status === 1 ) return classStyle = 'aceptado';
    if( status === 2 ) return classStyle = 'rechazado';
    return classStyle
  }

  changeShowInfo(link: Link){
    let statusString: string = '';
    if(typeof link.aprobed === 'number'){
      statusString = this.setClass(link.aprobed)
    }
    Swal.fire({
      title: '<strong>Información</strong>',
      icon: 'info',
      html:
        `Status: ${statusString.toUpperCase()} ` +
        `<br>Revisado por: ${link.approver ? link.approver : 'Pendiente'}<br>` +
        `<br>${link.message}`,
      showCloseButton: true
    })
  }


}
