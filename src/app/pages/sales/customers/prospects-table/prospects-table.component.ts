import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prospects-table',
  templateUrl: './prospects-table.component.html',
  styleUrls: ['./prospects-table.component.scss']
})
export class ProspectsTableComponent implements OnInit {
  public token: string = localStorage.getItem('token')!;
  public role_id: number = parseInt(localStorage.getItem('role_id')!);
  public departament_id: number = parseInt(localStorage.getItem('departament_id')!);
  public departament_alt_id: number | null = localStorage.getItem('departament_alt_id') ? parseInt(localStorage.getItem('departament_alt_id')!) : null;

  public lengthProspects: number | string = '...';
  public lengthNegociation: number | string = '...';
  public lengthFollowing: number | string = '...';
  public lengthClosed: number | string = '...';
  public idCustomerSelected: number = 0;
  public basicModalCloseResult: string = '';

  constructor(
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  setLenght(event: number, statusData: number){
    //console.log(event);
    if( statusData === 0 ) return this.lengthProspects = event;
    if( statusData === 1 ) return this.lengthNegociation = event;
    if( statusData === 2 ) return this.lengthFollowing = event;
    if( statusData === 3 ) return this.lengthClosed = event;

    return

  }

  openModal(id: number, content: TemplateRef<any>, xl = false) {
    this.idCustomerSelected = id;
    let params = {};

    if(xl) params = {size: 'lg', centered: true}
    //console.log(this.idCustomerSelected);

    this._modalService.open(content, params).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

}
