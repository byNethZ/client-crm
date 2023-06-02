import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { WizardComponent } from 'angular-archwizard';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { State } from 'src/app/models/state.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { StateService } from 'src/app/services/state.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getData() {}
}
