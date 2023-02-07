import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArrayGoalData } from 'src/app/models/goal.interface';
import { User } from 'src/app/models/user.interface';
import { GoalsService } from 'src/app/services/goals.service';
import { UserService } from 'src/app/services/user.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-goals',
  templateUrl: './edit-goals.component.html',
  styleUrls: ['./edit-goals.component.scss']
})
export class EditGoalsComponent implements OnInit {
  public utils = new Utils();
  public token: string = localStorage.getItem('token')!;
  public id: number = 0;
  public user: User;
  public charged: boolean = false;

  public arrayQuantity: ArrayGoalData;
  public arrayProspect: ArrayGoalData;

  public months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'novembre',
    'diciembre',
  ]

  quantityForm = new FormGroup({
    jan_goal: new FormControl(''),
    feb_goal: new FormControl(''),
    mar_goal: new FormControl(''),
    apr_goal: new FormControl(''),
    may_goal: new FormControl(''),
    jun_goal: new FormControl(''),
    jul_goal: new FormControl(''),
    aug_goal: new FormControl(''),
    sep_goal: new FormControl(''),
    oct_goal: new FormControl(''),
    nov_goal: new FormControl(''),
    dec_goal: new FormControl(''),
    jan_result: new FormControl(''),
    feb_result: new FormControl(''),
    mar_result: new FormControl(''),
    apr_result: new FormControl(''),
    may_result: new FormControl(''),
    jun_result: new FormControl(''),
    jul_result: new FormControl(''),
    aug_result: new FormControl(''),
    sep_result: new FormControl(''),
    oct_result: new FormControl(''),
    nov_result: new FormControl(''),
    dec_result: new FormControl(''),
  });

  prospectForm = new FormGroup({
    jan_goal: new FormControl(''),
    feb_goal: new FormControl(''),
    mar_goal: new FormControl(''),
    apr_goal: new FormControl(''),
    may_goal: new FormControl(''),
    jun_goal: new FormControl(''),
    jul_goal: new FormControl(''),
    aug_goal: new FormControl(''),
    sep_goal: new FormControl(''),
    oct_goal: new FormControl(''),
    nov_goal: new FormControl(''),
    dec_goal: new FormControl(''),
    jan_result: new FormControl(''),
    feb_result: new FormControl(''),
    mar_result: new FormControl(''),
    apr_result: new FormControl(''),
    may_result: new FormControl(''),
    jun_result: new FormControl(''),
    jul_result: new FormControl(''),
    aug_result: new FormControl(''),
    sep_result: new FormControl(''),
    oct_result: new FormControl(''),
    nov_result: new FormControl(''),
    dec_result: new FormControl(''),
  });

  constructor(
    private _goalsService: GoalsService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id') ? parseInt(this._route.snapshot.paramMap.get('id')!) : 1;
    this.getGoals();
    this.getUser();
  }

  getGoals() {

    this._goalsService.getGoals(this.token, this.id).subscribe({
      next: (result) => {
        this.arrayProspect = result.goals.prospects;
        this.arrayQuantity = result.goals.quantity;
        this.setFormData();
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

  getUser(){
    this._userService.getUser(this.id+'', this.token).subscribe({
      next: (response) => {
        this.user = response.user;
        this.charged = true;
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
    })
  }

  setFormData(){
    this.quantityForm.setValue({
      jan_goal: this.arrayQuantity.goals[0],
      feb_goal: this.arrayQuantity.goals[1],
      mar_goal: this.arrayQuantity.goals[2],
      apr_goal: this.arrayQuantity.goals[3],
      may_goal: this.arrayQuantity.goals[4],
      jun_goal: this.arrayQuantity.goals[5],
      jul_goal: this.arrayQuantity.goals[6],
      aug_goal: this.arrayQuantity.goals[7],
      sep_goal: this.arrayQuantity.goals[8],
      oct_goal: this.arrayQuantity.goals[9],
      nov_goal: this.arrayQuantity.goals[10],
      dec_goal: this.arrayQuantity.goals[11],
      jan_result: this.arrayQuantity.results[0],
      feb_result: this.arrayQuantity.results[1],
      mar_result: this.arrayQuantity.results[2],
      apr_result: this.arrayQuantity.results[3],
      may_result: this.arrayQuantity.results[4],
      jun_result: this.arrayQuantity.results[5],
      jul_result: this.arrayQuantity.results[6],
      aug_result: this.arrayQuantity.results[7],
      sep_result: this.arrayQuantity.results[8],
      oct_result: this.arrayQuantity.results[9],
      nov_result: this.arrayQuantity.results[10],
      dec_result: this.arrayQuantity.results[11],
    });

    this.prospectForm.setValue({
      jan_goal: this.arrayProspect.goals[0],
      feb_goal: this.arrayProspect.goals[1],
      mar_goal: this.arrayProspect.goals[2],
      apr_goal: this.arrayProspect.goals[3],
      may_goal: this.arrayProspect.goals[4],
      jun_goal: this.arrayProspect.goals[5],
      jul_goal: this.arrayProspect.goals[6],
      aug_goal: this.arrayProspect.goals[7],
      sep_goal: this.arrayProspect.goals[8],
      oct_goal: this.arrayProspect.goals[9],
      nov_goal: this.arrayProspect.goals[10],
      dec_goal: this.arrayProspect.goals[11],
      jan_result: this.arrayProspect.results[0],
      feb_result: this.arrayProspect.results[1],
      mar_result: this.arrayProspect.results[2],
      apr_result: this.arrayProspect.results[3],
      may_result: this.arrayProspect.results[4],
      jun_result: this.arrayProspect.results[5],
      jul_result: this.arrayProspect.results[6],
      aug_result: this.arrayProspect.results[7],
      sep_result: this.arrayProspect.results[8],
      oct_result: this.arrayProspect.results[9],
      nov_result: this.arrayProspect.results[10],
      dec_result: this.arrayProspect.results[11],
    })
  }

  orderGoalData(data: any, parse: 'float' | 'int', array: any[]) {

    data.map( (result: number | string) => {
      // if(typeof result === 'string') {
      //   result = parse === 'float'
      //   ? parseFloat(result)
      //   : parseInt(result);
      // }
      //array.push((result as number));
      array.push(result);
    })
  }

  submitForm(){

    if(this.id === 0) return;

    let body = {
      id_vendor: this.id,
      jan_goal_quantity: this.quantityForm.value.jan_goal,
      feb_goal_quantity: this.quantityForm.value.feb_goal,
      mar_goal_quantity: this.quantityForm.value.mar_goal,
      apr_goal_quantity: this.quantityForm.value.apr_goal,
      may_goal_quantity: this.quantityForm.value.may_goal,
      jun_goal_quantity: this.quantityForm.value.jun_goal,
      jul_goal_quantity: this.quantityForm.value.jul_goal,
      aug_goal_quantity: this.quantityForm.value.aug_goal,
      sep_goal_quantity: this.quantityForm.value.sep_goal,
      oct_goal_quantity: this.quantityForm.value.oct_goal,
      nov_goal_quantity: this.quantityForm.value.nov_goal,
      dec_goal_quantity: this.quantityForm.value.dec_goal,
      jan_result_quantity: this.quantityForm.value.jan_result,
      feb_result_quantity: this.quantityForm.value.feb_result,
      mar_result_quantity: this.quantityForm.value.mar_result,
      apr_result_quantity: this.quantityForm.value.apr_result,
      may_result_quantity: this.quantityForm.value.may_result,
      jun_result_quantity: this.quantityForm.value.jun_result,
      jul_result_quantity: this.quantityForm.value.jul_result,
      aug_result_quantity: this.quantityForm.value.aug_result,
      sep_result_quantity: this.quantityForm.value.sep_result,
      oct_result_quantity: this.quantityForm.value.oct_result,
      nov_result_quantity: this.quantityForm.value.nov_result,
      dec_result_quantity: this.quantityForm.value.dec_result,

      jan_goal_prospect: this.prospectForm.value.jan_goal,
      feb_goal_prospect: this.prospectForm.value.feb_goal,
      mar_goal_prospect: this.prospectForm.value.mar_goal,
      apr_goal_prospect: this.prospectForm.value.apr_goal,
      may_goal_prospect: this.prospectForm.value.may_goal,
      jun_goal_prospect: this.prospectForm.value.jun_goal,
      jul_goal_prospect: this.prospectForm.value.jul_goal,
      aug_goal_prospect: this.prospectForm.value.aug_goal,
      sep_goal_prospect: this.prospectForm.value.sep_goal,
      oct_goal_prospect: this.prospectForm.value.oct_goal,
      nov_goal_prospect: this.prospectForm.value.nov_goal,
      dec_goal_prospect: this.prospectForm.value.dec_goal,
      jan_result_prospect: this.prospectForm.value.jan_result,
      feb_result_prospect: this.prospectForm.value.feb_result,
      mar_result_prospect: this.prospectForm.value.mar_result,
      apr_result_prospect: this.prospectForm.value.apr_result,
      may_result_prospect: this.prospectForm.value.may_result,
      jun_result_prospect: this.prospectForm.value.jun_result,
      jul_result_prospect: this.prospectForm.value.jul_result,
      aug_result_prospect: this.prospectForm.value.aug_result,
      sep_result_prospect: this.prospectForm.value.sep_result,
      oct_result_prospect: this.prospectForm.value.oct_result,
      nov_result_prospect: this.prospectForm.value.nov_result,
      dec_result_prospect: this.prospectForm.value.dec_result,
    }

    //console.log(body)
    this._goalsService.saveGoals(this.token, body).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Los datos se han guardado correctamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        this._modalService.dismissAll();
        this._router.navigate([`/admin/metas`]);
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
      }
    })
  }

  openModal(content: TemplateRef<any>) {
    let params = {centered: true}

    this._modalService.open(content, params).result.then((result) => {

    }).catch((res) => {});
  }

}
