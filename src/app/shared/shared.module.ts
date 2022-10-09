import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomersvendorsComponent } from './customersvendors/customersvendors.component';
import { InputArrayComponent } from './inputarray/inputarray.components';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfocardsComponent } from './infocards/infocards.component';



@NgModule({
  declarations: [
    CustomersvendorsComponent,
    InputArrayComponent,
    InfocardsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgApexchartsModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomersvendorsComponent,
    InputArrayComponent,
    InfocardsComponent
  ]
})
export class SharedModule { }
