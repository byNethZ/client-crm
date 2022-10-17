import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomersvendorsComponent } from './customersvendors/customersvendors.component';
import { InputArrayComponent } from './inputarray/inputarray.components';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfocardsComponent } from './infocards/infocards.component';
import { ProgressComponent } from './progress/progress.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from './comments/comments.component';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    CustomersvendorsComponent,
    InputArrayComponent,
    InfocardsComponent,
    ProgressComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgApexchartsModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    QuillModule.forRoot(),
  ],
  exports: [
    CustomersvendorsComponent,
    InputArrayComponent,
    InfocardsComponent,
    ProgressComponent,
    CommentsComponent
  ]
})
export class SharedModule { }
