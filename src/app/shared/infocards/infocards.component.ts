import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { InputArray } from 'src/app/models/inputs';

@Component({
  selector: 'info-cards',
  templateUrl: './infocards.component.html',
  styleUrls: ['./infocards.component.scss']
})
export class InfocardsComponent implements OnInit, OnChanges {
  public dataParsed: [];
  public textData: string;

  @Input() title: string;
  @Input() type: InputArray;
  @Input() info: string | string[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(){
    this.formatData()

  }

  formatData(){
    //console.log(this.info);
    let parsedData;
    if(typeof this.info === 'string' && this.info && this.type !== 'text') {
      parsedData = JSON.parse(this.info);
      return this.dataParsed = parsedData;
    };

    if(this.type === 'text' && typeof this.info === 'string') this.textData = this.info;
    return

  }

}
