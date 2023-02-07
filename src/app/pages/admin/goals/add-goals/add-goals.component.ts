import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { GoalsService } from 'src/app/services/goals.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

type BodyRequest = {
  id_vendor: number;
  month: string;
  value_quantity: number;
  value_prospect: number;
};

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss'],
})
export class AddGoalsComponent implements OnInit {
  public utils = new Utils();
  public bodyRequest: BodyRequest;

  @Input() vendor: User;
  @Input() month: string;
  @Input() token: string;

  public charging: boolean = false;
  public showInputs: boolean = true;

  public form = new FormGroup({
    inputValueProspect: new FormControl(0),
    inputValueQuantity: new FormControl(0),
  });

  constructor(private _goalsService: GoalsService) {
    this.bodyRequest = {
      id_vendor: 0,
      month: '',
      value_quantity: 0,
      value_prospect: 0,
    };
  }

  ngOnInit(): void {}

  saveGoal() {
    //this.showInputs = false;
    //this.showInputs = true;

    this.bodyRequest.id_vendor = this.vendor.id;
    this.bodyRequest.month = this.month;
    this.bodyRequest.value_quantity = this.form.value.inputValueQuantity;
    this.bodyRequest.value_prospect = this.form.value.inputValueProspect;

    this._goalsService
      .updateGoals(this.token, this.bodyRequest, this.vendor.id)
      .subscribe({
        next: (response) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `Se ha guardado correctamente la meta de ${this.vendor.name}`,
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
          });
          this.showInputs = false;
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: `Error: ${err.message}`,
            showConfirmButton: false,
            showCloseButton: true,
          });
        },
      });
  }
}
