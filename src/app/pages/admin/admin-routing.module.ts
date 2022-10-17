import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals/goals.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateUserComponent } from './teams/create-user/create-user.component';
import { EditUserComponent } from './teams/edit-user/edit-user.component';
import { TeamsComponent } from './teams/teams.component';
import { UserComponent } from './teams/user/user.component';

const routes: Routes = [
  {path:'', component: TeamsComponent},
  {path:'team', component: TeamsComponent},
  {path:'team/:id', component: UserComponent},
  {path:'edit-user/:id', component: EditUserComponent},
  {path:'create-user', component: CreateUserComponent},
  {path:'reportes', component: ReportsComponent},
  {path:'metas', component: GoalsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
