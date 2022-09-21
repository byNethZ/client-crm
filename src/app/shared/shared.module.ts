import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomersvendorsComponent } from './customersvendors/customersvendors.component';



@NgModule({
  declarations: [
    CustomersvendorsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgApexchartsModule
  ],
  exports: [
    CustomersvendorsComponent
  ]
})
export class SharedModule { }
