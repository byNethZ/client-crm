import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ArrayGoalData, Goal } from 'src/app/models/goal.interface';
import { GoalsService } from 'src/app/services/goals.service';
import graphicColors from 'src/assets/data/graphic-color';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goals-graphics',
  templateUrl: './goals-graphics.component.html',
  styleUrls: ['./goals-graphics.component.scss'],
})
export class GoalsGraphicsComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public type: string = 'quantity';

  public arrayQuantity: ArrayGoalData = {
    goals: [],
    results: []
  };
  public arrayProspect: ArrayGoalData = {
    goals: [],
    results: []
  };

  public groupedBarChartData: ChartData<'bar'> = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Designada',
        backgroundColor: graphicColors.danger,
        hoverBackgroundColor: graphicColors.danger,
        borderColor: graphicColors.danger,
        hoverBorderColor: graphicColors.danger,
        data: this.type === 'quantity' ? this.arrayQuantity.goals : this.arrayProspect.goals,
      },
      {
        label: 'Alcanzada',
        backgroundColor: graphicColors.primary,
        hoverBackgroundColor: graphicColors.primary,
        borderColor: graphicColors.primary,
        hoverBorderColor: graphicColors.primary,
        data: this.type === 'quantity' ? this.arrayQuantity.results : this.arrayProspect.results,
      },
    ],
  };

  public groupedBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: graphicColors.bodyColor,
          font: {
            size: 13,
            family: graphicColors.fontFamily,
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: graphicColors.gridBorder,
          borderColor: graphicColors.gridBorder,
        },
        ticks: {
          color: graphicColors.bodyColor,
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: graphicColors.gridBorder,
          borderColor: graphicColors.gridBorder,
        },
        ticks: {
          color: graphicColors.bodyColor,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  @Input() token: string;
  @Input() id: number | string;

  constructor(private _goalsService: GoalsService) {}

  ngOnInit(): void {
    this.getGoals();
  }

  ngOnChanges(): void {
    this.getGoals();
  }

  getGoals() {
    if(typeof this.id === 'string') this.id = parseInt(this.id)
    this._goalsService.getGoals(this.token, this.id).subscribe({
      next: (result) => {
        this.resetData();
        this.orderGoalData(result.goals.quantity.results, 'float', this.arrayQuantity.results);
        this.orderGoalData(result.goals.quantity.goals, 'float', this.arrayQuantity.goals);
        this.orderGoalData(result.goals.prospects.results, 'int', this.arrayProspect.results);
        this.orderGoalData(result.goals.prospects.goals, 'int', this.arrayProspect.goals);
        this.setData();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${err.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      },
    });
  }

  resetData(){
    this.arrayQuantity.results = [];
    this.arrayQuantity.goals = [];
    this.arrayProspect.results = [];
    this.arrayProspect.goals = []
  }

  orderGoalData(data: any, parse: 'float' | 'int', array: number[]) {

    data.map( (result: number | string) => {
      if(typeof result === 'string') {
        result = parse === 'float'
        ? parseFloat(result)
        : parseInt(result);
      }
      array.push((result as number));
    })
  }

  changeType(evt: Event){
    this.type = (evt.target as HTMLInputElement).value;
    this.setData();
  }

  setData(){
    this.groupedBarChartData.datasets[0].data = this.type === 'quantity' ? this.arrayQuantity.goals : this.arrayProspect.goals;
    this.groupedBarChartData.datasets[1].data = this.type === 'quantity' ? this.arrayQuantity.results : this.arrayProspect.results;

    this.chart.chart?.update();
  }
}
