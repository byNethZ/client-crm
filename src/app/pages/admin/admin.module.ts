import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { UserComponent } from './teams/user/user.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditUserComponent } from './teams/edit-user/edit-user.component';
import { CreateUserComponent } from './teams/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { GoalsComponent } from './goals/goals.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { EditGoalsComponent } from './goals/edit-goals/edit-goals.component';
import { AddGoalsComponent } from './goals/add-goals/add-goals.component';
import { AssistsComponent } from './assists/assists.component';


@NgModule({
  declarations: [
    TeamsComponent,
    UserComponent,
    EditUserComponent,
    CreateUserComponent,
    ReportsComponent,
    GoalsComponent,
    EditGoalsComponent,
    AddGoalsComponent,
    AssistsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule
  ]
})
export class AdminModule { }
