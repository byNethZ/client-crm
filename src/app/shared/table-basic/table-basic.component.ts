import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent implements OnInit {
  public dataFiltered: any[];
  public filterValue: string;

  @Input() data: any[];
  @Input() headers: string[];
  @Input() fields: string[];

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    //console.log(this.filterValue);
    let filterValueLower = this.filterValue.toLowerCase();
    if(this.filterValue === '' ) {
        this.dataFiltered = this.data;
    }
    else {
      this.dataFiltered = this.data.filter((promo) => promo.asesor.toLowerCase().includes(filterValueLower,-1))
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
