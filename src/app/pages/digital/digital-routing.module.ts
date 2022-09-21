import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { WebsitesComponent } from './websites/websites.component';

const routes: Routes = [
  {path: '', component: PanelComponent},
  {path: 'websites', component: WebsitesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalRoutingModule { }
