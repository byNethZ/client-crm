import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule, NgbCarouselModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './components/sales/sales.component';

import { NgChartsModule } from 'ng2-charts';
import { GoogleMapsModule } from '@angular/google-maps';
import { DesignComponent } from './components/design/design.component';
import { AdminComponent } from './components/admin/admin.component';
import { ButtonsDashboardComponent } from './components/buttons-dashboard/buttons-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [DashboardComponent, SalesComponent, DesignComponent, AdminComponent, ButtonsDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgbCarouselModule,
    NgChartsModule,
    GoogleMapsModule,
    NgbAccordionModule
  ],
  exports: [

  ]
})
export class DashboardModule { }
