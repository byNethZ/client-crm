import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { ArchwizardModule } from 'angular-archwizard';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderProductComponent } from './create-orders/order-product/order-product.component';
import { TableOrderComponent } from './create-orders/table-order/table-order.component';

@NgModule({
  declarations: [
    CreateOrdersComponent,
    OrderProductComponent,
    TableOrderComponent,
  ],
  imports: [
    OrdersRoutingModule,
    CommonModule,
    ArchwizardModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class OrdersModule {}
