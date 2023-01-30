import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Goal } from 'src/app/models/goal.interface';
import { User } from 'src/app/models/user.interface';
import { GoalsService } from 'src/app/services/goals.service';
import { VendorService } from 'src/app/services/vendor.service';
import graphicColors from 'src/assets/data/graphic-color';
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

  public groupedBarChartData: ChartData<'bar'> = {
    labels: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "novembre", "diciembre"],
    datasets: [
      {
        label: "Designada",
        backgroundColor: graphicColors.danger,
        hoverBackgroundColor: graphicColors.danger,
        borderColor: graphicColors.danger,
        hoverBorderColor: graphicColors.danger,
        data: [133,221,783,2478]
      }, {
        label: "Alcanzada",
        backgroundColor: graphicColors.primary,
        hoverBackgroundColor: graphicColors.primary,
        borderColor: graphicColors.primary,
        hoverBorderColor: graphicColors.primary,
        data: [408,547,675,734]
      }
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
            family: graphicColors.fontFamily
          }
        }
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
            size: 12
          }
        }
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
            size: 12
          }
        }
      }
    }
  };

  constructor(
    private _goalsService: GoalsService,
    private _vendorService: VendorService,
    private _modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getGoals();
    this.getVendorsMarketing();
  }

  getGoals(){
    this._goalsService.getGoals(this.token).subscribe({
      next: (result) => {
        //console.log(result);
        this.orderGoalData(result.goals_prospect)
        this.orderGoalData(result.goals_quantity)
      },
      error: (err) => {
        console.log(err);
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

  orderGoalData(items: Goal[]){
    console.log(items)
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




}
