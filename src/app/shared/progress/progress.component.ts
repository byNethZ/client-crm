import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.interface';
import { GoalsService } from 'src/app/services/goals.service';
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
  public goalsData: Goal[] = [];
  public currentMonthData: IData;
  public resultDataProspect: number = 0;
  public percentDataProspect: number = 0;
  public goalDataProspect: number = 0;
  public resultDataQuantity: number = 0;
  public goalDataQuantity: number = 0;
  public percentDataQuantity: number = 0;
  @Input() idUser: number = 0;
  @Input() withInfo: boolean = true;
  @Input() token: string | null = '';
  @Input() isPanel: boolean = false;

  constructor(private _goalsService: GoalsService) {
    this.currentMonthData = {
      prospect: { isSet: false, goal: 0, result: 0 },
      quantity: { isSet: false, goal: 0, result: 0 },
    }
  }

  ngOnInit(): void {
    this.getGoal();
  }

  ngOnChanges(){
    this.handleChanges();
  }

  handleChanges(){
    if(this.isPanel) this.getGoal();
  }

  getGoal() {
    this._goalsService.getGoalsByUser(this.token!, this.idUser).subscribe({
      next: (result) => {
        //console.log(result);
        this.goalsData = result.goals;
        this.getDataCurrentMonth();
      },
      error: (error) => console.log(error),
    });
  }

  getDataCurrentMonth(){
    const date = new Date(); // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    let currentMonthKey = this.utils.formatMonthForGoal(month, 'goal');
    let currentMonthValue = this.utils.formatMonthForGoal(month, 'result');

    this.goalsData.map( ( goal: Goal ) => {

      if( goal.type === 1 ){
        this.currentMonthData.quantity.isSet = true;
        this.currentMonthData.quantity.goal = goal[currentMonthKey] !== null ? parseInt(goal[currentMonthKey]+'') : 0;
        this.currentMonthData.quantity.result = goal[currentMonthValue] !== null ? parseInt(goal[currentMonthValue]+'') : 0;
      }

      if( goal.type === 2 ){
        this.currentMonthData.prospect.isSet = true;
        this.currentMonthData.prospect.goal = goal[currentMonthKey] !== null ? parseInt(goal[currentMonthKey]+'') : 0;
        this.currentMonthData.prospect.result = goal[currentMonthValue] !== null ? parseInt(goal[currentMonthValue]+'') : 0;
      }
    })

    this.calcData();

  }

  calcData(){
    this.resultDataProspect = this.currentMonthData.prospect.result ? this.currentMonthData.prospect.result :0
    this.goalDataProspect = this.currentMonthData.prospect.goal ? this.currentMonthData.prospect.goal : 0

    this.resultDataQuantity = this.currentMonthData.quantity.result ? this.currentMonthData.quantity.result : 0
    this.goalDataQuantity = this.currentMonthData.quantity.goal ? this.currentMonthData.quantity.goal : 0

    this.percentDataProspect = ( this.resultDataProspect * 100 ) / this.goalDataProspect
    this.percentDataQuantity = ( this.resultDataQuantity * 100 ) / this.goalDataQuantity
  }
}
