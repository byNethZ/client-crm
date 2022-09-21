import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prospects-table',
  templateUrl: './prospects-table.component.html',
  styleUrls: ['./prospects-table.component.scss']
})
export class ProspectsTableComponent implements OnInit {

  public lengthProspects: number | string = '...';
  public lengthNegociation: number | string = '...';
  public lengthFollowing: number | string = '...';
  public lengthClosed: number | string = '...';

  constructor() { }

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

}
