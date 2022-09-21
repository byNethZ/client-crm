import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { ChecklistComponent } from './checklist/checklist.component';
import { CreateChecklistComponent } from './checklist/create-checklist/create-checklist.component';
import { EditChecklistComponent } from './checklist/edit-checklist/edit-checklist.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsChecklistComponent } from './checklist/details-checklist/details-checklist.component';
import { MaterialModule } from 'src/app/material.module';
import { FotographiesComponent } from './fotographies/fotographies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';


@NgModule({
  declarations: [
    ChecklistComponent,
    CreateChecklistComponent,
    EditChecklistComponent,
    DetailsChecklistComponent,
    FotographiesComponent
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    FeatherIconModule,
  ]
})
export class DesignModule { }
