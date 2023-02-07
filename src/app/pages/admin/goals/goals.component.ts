import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.interface';

import { User } from 'src/app/models/user.interface';
import { VendorService } from 'src/app/services/vendor.service';

import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  public token: string = localStorage.getItem('token')!;
  public role: number = parseInt(localStorage.getItem('role_id')!);
  public utils = new Utils();
  public vendors: User[] = []
  public vendorID: number = 99;

  public months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'novembre',
    'diciembre',
  ];
  public monthSelected: keyof Goal;

  constructor(
    private _vendorService: VendorService,
  ) {
  }

  ngOnInit(): void {

    this.getVendorsMarketing();
    this.setCurrentMonth();
  }

  setCurrentMonth(){
    let date  =  new Date();
    let currentMonth = date.getMonth();
    this.monthSelected = this.utils.formatMonthForGoal(currentMonth, 'result');
    console.log(this.monthSelected);
  }

  getVendorsMarketing(){
    this._vendorService.getVendorsAndMarketing(this.token).subscribe({
      next: (result) => {
        //console.log(result);
        this.vendors =  result;
      },
      error: ( err ) => {
        console.error(err)
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${err.message}`,
          showConfirmButton: false,
          showCloseButton: true
        });
      }

    })
  }

  createGoal(id: number){
    console.log(`Creando meta para el vendedor ${id}`)
  }

  setVendorID(evt: Event){
    this.vendorID = parseInt((evt.target as HTMLSelectElement).value);

  }

  changeMonth(evt: Event){
    this.monthSelected = (evt.target as HTMLInputElement).value as keyof Goal;
    console.log(this.monthSelected)
  }




}
