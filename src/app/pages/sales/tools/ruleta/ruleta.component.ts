import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/models/promo.interface';
import { PromoService } from 'src/app/services/promo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.scss']
})
export class RuletaComponent implements OnInit {
  public ruleta: Promo[];
  public ruletaFiltered: Promo[];
  public token: string = localStorage.getItem('token')!;
  public filterValue: string;

  constructor(
    private _promoService: PromoService
  ) { }

  ngOnInit(): void {
    this.getPromos();
  }

  getPromos() {
    this._promoService.getRuleta(this.token).subscribe(
      response => {

        this.ruleta = response;
        this.ruletaFiltered = this.ruleta;

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
        this.ruletaFiltered = this.ruleta;
    }
    else {
      this.ruletaFiltered = this.ruleta.filter((ruleta) => ruleta.asesor.toLowerCase().includes(filterValueLower,-1))
    }

  }

  saveClipboard(link: string){
    navigator.clipboard.writeText(link);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Se ha copiado al portapapeles',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

  }

  setDelivered(id: number){
    this._promoService.setDelivered(this.token, id).subscribe(
      response => {
        this.getPromos();
      },
      error => {
        console.log(error)
      }
    )
  }

}
