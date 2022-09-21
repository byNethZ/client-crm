import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/models/promo.interface';
import { PromoService } from 'src/app/services/promo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit {
  public promos: Promo[];
  public promosFiltered: Promo[];
  public token: string = localStorage.getItem('token')!;
  public filterValue: string;

  constructor(
    private _promoService: PromoService
  ) { }

  ngOnInit(): void {
    this.getPromos();
  }

  getPromos() {
    this._promoService.getPromos(this.token).subscribe(
      response => {

        this.promos = response;
        this.promosFiltered = this.promos;

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
        this.promosFiltered = this.promos;
    }
    else {
      this.promosFiltered = this.promos.filter((promo) => promo.asesor.toLowerCase().includes(filterValueLower,-1))
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

}
