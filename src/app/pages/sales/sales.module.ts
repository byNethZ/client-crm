import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CataloguesComponent } from './catalogues/catalogues.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PromosComponent } from './promos/promos.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './products/product/product.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { RuletaComponent } from './ruleta/ruleta.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ArchwizardModule } from 'angular-archwizard';
import { MaterialModule } from 'src/app/material.module';
import { ProspectsTableComponent } from './customers/prospects-table/prospects-table.component';
import { DataTableComponent } from './customers/prospects-table/data-table/data-table.component';
import { NewComponent } from './customers/new/new.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ProspectsComponent } from './customers/prospects/prospects.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    CataloguesComponent,
    ProductsComponent,
    CustomersComponent,
    PromosComponent,
    CustomerComponent,
    ProductComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    RuletaComponent,
    ProspectsTableComponent,
    DataTableComponent,
    NewComponent,
    ProspectsComponent,
    OrdersComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    SalesRoutingModule,
    SweetAlert2Module.forRoot(),
    NgbRatingModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ArchwizardModule,
    MaterialModule,
    NgbModule,
    FeatherIconModule,
  ]
})
export class SalesModule { }
