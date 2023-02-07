import { Component, Input, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link.interface';
import { LinksService } from 'src/app/services/links.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-checklist',
  templateUrl: './details-checklist.component.html',
  styleUrls: ['./details-checklist.component.scss'],
})
export class DetailsChecklistComponent implements OnInit {
  public token: string = localStorage.getItem('token')!;
  public links: Link[] = [];
  public linksFiltered: Link[] = [];

  public urlGif: string = '';
  public currentPage: number = 1;
  public lastPage: number = 5;

  public filteredValue: string = '';
  public role_id: number = parseInt(localStorage.getItem('role_id')!);

  @Input() status: number;

  constructor(private _linkService: LinksService) {}

  ngOnInit(): void {
    this.getLinks();
    //console.log(this.isAll)
    this.getGif();
  }

  getLinks() {
    this._linkService
      .getLinks(this.token, this.status, this.currentPage)
      .subscribe(
        (response) => {
          this.parseData(response.links.data);
          this.lastPage = response.links.last_page
          //console.log(response.links)
        },
        (error) => {
          console.log(error);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: `Error: ${error.message}`,
            showConfirmButton: false,
            showCloseButton: true,
          });
        }
      );
  }

  parseData( data: Link[] ) {
    if(this.links.length === 0){
      this.links = data;
    } else {
      this.links = [ ...this.links, ...data ];
    }

    this.applyFilter(this.filteredValue);
  }

  setFilteredValue(event: Event){
    this.filteredValue = (event.target as HTMLInputElement).value;
    this.applyFilter(this.filteredValue);
  }

  applyFilter(value: string) {

    let filteredValueLower = value.toLowerCase();

    if (this.filteredValue === '') {
      this.linksFiltered = this.links;
    } else {
      this.linksFiltered = this.links.filter((link) => {
        if (link.customer) {
          return link.customer.toLowerCase().includes(filteredValueLower, -1);
        }
        return true;
      });
    }
  }

  deleteLink(id: any) {
    Swal.fire({
      title: 'Este simbolo significa Peligro!!',
      text: 'Estás a punto de eliminar un pobre registro que no te ha hecho nada ¿Podrás dormir con la conciencia tranquila después de esto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '#YOLO',
      cancelButtonText: 'Noo, cancela!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._linkService.deleteLink(id, this.token).subscribe(
          (response) => {
            this.getLinks();
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'El link ha sido eliminado y es tu culpa \n :(',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          },
          (error) => {
            console.log(error);
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'warning',
              title: `Error: ${error.message}`,
              showConfirmButton: false,
              showCloseButton: true,
            });
          }
        );
      }
    });
  }

  resetLink(id: number) {
    this._linkService.changeStatusLink(id + '', this.token).subscribe(
      (response) => {
        this.getLinks();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El link ha sido reseteado exitosamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    );
  }

  copyLink(id: number, type: string) {
    if (!navigator.clipboard) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'El navegador no permite copiar el link',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    navigator.clipboard
      .writeText(
        `https://bliones.net/checklist/menus/${type ? type : 'menu'}/${id}`
      )
      .then(
        (response) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'El link se copió al portapapeles',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        },
        (err) => {
          console.error('Async: Could not copy text: ', err);
        }
      );
  }

  setClass(status: number): string {
    let classStyle: string = '';
    if (status === 0) return (classStyle = 'pendiente');
    if (status === 1) return (classStyle = 'aprobado');
    if (status === 2) return (classStyle = 'declinado');
    return classStyle;
  }

  changeShowInfo(link: Link) {
    let statusString: string = '';
    let createdDateParsed: string = new Date(link.created_at).toLocaleString(
      'en-US',
      { dateStyle: 'long', timeZone: 'America/New_York' }
    );
    let updatedDateParsed: string = new Date(link.updated_at).toLocaleString(
      'en-US',
      { dateStyle: 'long', timeZone: 'America/New_York' }
    );
    this.getGif();
    console.log(link.aprobed);
    if (typeof link.aprobed === 'number') {
      statusString = this.setClass(link.aprobed);
    }
    Swal.fire({
      title: '<strong>Información</strong>',
      icon: 'info',
      html:
        `<p class="info-swal-checklist">Status: ${statusString.toUpperCase()}</p>` +
        `<p class="info-swal-checklist">Checklist: ${link.customer}</p><br>` +
        `<p class="info-swal-checklist">Tipo: ${link.type}</p>` +
        `<p class="info-swal-checklist">${this.formatNotes(
          link.notes
        )}</p><br>` +
        `<p class="info-swal-checklist">Revisado por: ${
          link.approver ? link.approver : 'Pendiente'
        }</p><br>` +
        `<p class="info-swal-checklist info-swal-message">${link.message}</p>` +
        `<p class="info-swal-checklist">Creado: ${createdDateParsed}</p>` +
        `<p class="info-swal-checklist">${this.formatedDateUpdated(
          updatedDateParsed,
          link.aprobed
        )}</p>` +
        `<img class="img-swal-checklist" src="${
          link.aprobed === 1 ? this.urlGif : ''
        }" alt="">`,
      showCloseButton: true,
    });
  }

  formatedDateUpdated(date: string, status: number): string {
    if (status !== 0) return `Revisado: ${date}`;

    return '';
  }

  formatNotes(notes: string): string {
    if (!notes) return '';

    return `Nota: ${notes}`;
  }

  getGif() {
    this._linkService.getGif().subscribe(
      (response: any) => {
        //console.log(response.data.images.original.url);
        //console.log(response);
        this.urlGif = response.data.images.original.url;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    );
  }

  getMore(){
    this.currentPage ++;
    this.getLinks();
  }
}
