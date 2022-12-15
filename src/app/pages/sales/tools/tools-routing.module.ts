import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguesComponent } from './catalogues/catalogues.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { NewComponent } from './customers/new/new.component';
import { ProspectsTableComponent } from './customers/prospects-table/prospects-table.component';
import { RejectedCustomersComponent } from './customers/rejected-customers/rejected-customers.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products.component';
import { PromosComponent } from './promos/promos.component';
import { RuletaComponent } from './ruleta/ruleta.component';

const routes: Routes = [
  {path:'', component: CataloguesComponent},
  {path:'products', component: ProductsComponent},
  {path:'product/:id', component: ProductComponent},
  {path:'customers', component: CustomersComponent},
  {path:'customers/new', component: NewComponent},
  {path:'customers/category/:id', component: CustomersComponent},
  {path:'customer/:id', component: CustomerComponent},
  {path:'edit-customer/:id', component: EditCustomerComponent},
  {path:'create-customer', component: CreateCustomerComponent},
  {path:'promos', component: PromosComponent},
  {path:'ruleta', component: RuletaComponent},
  {path:'table-prospects', component: ProspectsTableComponent},
  {path:'rejected-prospects', component: RejectedCustomersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
