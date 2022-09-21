import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './checklist/checklist.component';
import { CreateChecklistComponent } from './checklist/create-checklist/create-checklist.component';
import { EditChecklistComponent } from './checklist/edit-checklist/edit-checklist.component';
import { DetailsChecklistComponent } from './checklist/details-checklist/details-checklist.component';
import { FotographiesComponent } from './fotographies/fotographies.component';

const routes: Routes = [
  {path: '', component: ChecklistComponent},
  {path: 'checklists', component: ChecklistComponent},
  {path: 'checklist/:id', component: DetailsChecklistComponent},
  {path: 'create-checklist', component: CreateChecklistComponent},
  {path: 'edit-checklist/:id', component: EditChecklistComponent},
  {path: 'photographies', component: FotographiesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
