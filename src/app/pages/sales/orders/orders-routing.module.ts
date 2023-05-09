import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { CreateOrdersComponent } from './create-orders/create-orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'create', component: CreateOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
