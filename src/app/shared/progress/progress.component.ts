import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Utils from 'src/utils/Utils';

interface IData {
  prospect: {
    isSet: boolean,
    goal: number | null,
    result: number | null
  },
  quantity: {
    isSet: boolean,
    goal: number| null,
    result: number | null
  },
}

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit, OnChanges {
  public utils = new Utils();

  @Input() arrayQuantityGoals: number[];
  @Input() arrayQuantityResults: number[];
  @Input() arrayProspectsGoals: number[];
  @Input() arrayProspectsResults: number[];

  public indexMonth: number = 0;
  public isInfo: boolean = false;


  constructor() {}

  ngOnInit(): void {
    this.formatData();
  }

  ngOnChanges(){
    this.formatData()
  }

  getCurrentMonth(): number{
    const date = new Date();
    const month = date.getMonth();
    return month;
  }

  formatData(){
    this.indexMonth = this.getCurrentMonth();
    // console.log(this.arrayQuantityGoals[this.indexMonth]);
    // console.log(this.arrayQuantityResults[this.indexMonth]);
    // console.log(this.arrayProspectsGoals[this.indexMonth]);
    // console.log(this.arrayProspectsResults[this.indexMonth]);
    if(
      this.arrayQuantityGoals.length === 0 &&
      this.arrayQuantityResults.length === 0 &&
      this.arrayProspectsGoals.length === 0 &&
      this.arrayProspectsResults.length === 0
    ) { this.isInfo = false } else { this.isInfo = true };
  }
}
