import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { DigitalRoutingModule } from './digital-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebsitesComponent } from './websites/websites.component';



@NgModule({
  declarations: [
    PanelComponent,
    WebsitesComponent
  ],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DigitalModule { }
