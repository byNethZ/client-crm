import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Goal } from 'src/app/models/goal.interface';
import { User } from 'src/app/models/user.interface';
import { GoalsService } from 'src/app/services/goals.service';
import { VendorService } from 'src/app/services/vendor.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  public utils = new Utils()
  public token: string = localStorage.getItem('token')!;
  public role: number = parseInt(localStorage.getItem('role_id')!);
  public vendors: User[] = []
  public isOpen: boolean = false;
  public isNew: boolean = true;
  public isDataMonthAvailable: boolean = false;
  public resultGoal: number = 0;
  public resultConstantGoal: number = 0;
  public percentGoal: number = 0 ;
  public assignedCurrentGoal: number = 0 ;
  public basicModalCloseResult: string = '';
  public idGoal: string = '';
  public goal: Goal;
  public goals: Goal[] = []
  public goalsSelected: Goal[] = [];
  public idVendorSelected: number = 0;
  public buttonSave: string = 'Guardar';
  public formGoal = new FormGroup({
    apr_goal: new FormControl(''),
    apr_result: new FormControl(''),
    aug_goal: new FormControl(''),
    aug_result: new FormControl(''),
    dec_goal: new FormControl(''),
    dec_result: new FormControl(''),
    feb_goal: new FormControl(''),
    feb_result: new FormControl(''),
    id: new FormControl(1),
    jan_goal: new FormControl(''),
    jan_result: new FormControl(''),
    jul_goal: new FormControl(''),
    jul_result: new FormControl(''),
    jun_goal: new FormControl(''),
    jun_result: new FormControl(''),
    mar_goal: new FormControl(''),
    mar_result: new FormControl(''),
    may_goal: new FormControl(''),
    may_result: new FormControl(''),
    nov_goal: new FormControl(''),
    nov_result: new FormControl(''),
    oct_goal: new FormControl(''),
    oct_result: new FormControl(''),
    sep_goal: new FormControl(''),
    sep_result: new FormControl(''),
    type: new FormControl(1),
    user_id: new FormControl(1),


  });

  public formResult = new FormGroup({
    key: new FormControl(''),
    value: new FormControl('')

  });

  constructor(
    private _goalsService: GoalsService,
    private _vendorService: VendorService,
    private _modalService: NgbModal,
  ) {
    this.goal = {
      apr_goal: null,
      apr_result: null,
      aug_goal: null,
      aug_result: null,
      dec_goal: null,
      dec_result: null,
      feb_goal: null,
      feb_result: null,
      id: 1,
      jan_goal: null,
      jan_result: null,
      jul_goal: null,
      jul_result: null,
      jun_goal: null,
      jun_result: null,
      mar_goal: null,
      mar_result: null,
      may_goal: null,
      may_result: null,
      nov_goal: null,
      nov_result: null,
      oct_goal: null,
      oct_result: null,
      sep_goal: null,
      sep_result: null,
      type: 1,
      user_id: 1,
    }
  }

  ngOnInit(): void {
    this.getGoals();
    this.getVendorsMarketing();
  }

  getGoals(){
    this._goalsService.getGoals(this.token).subscribe({
      next: (result) => {
        //console.log(result);
        this.goals = result.goals
      },
      error: (err) => { console.log(err); }
    })
  }

  getVendorsMarketing(){
    this._vendorService.getVendorsAndMarketing(this.token).subscribe({
      next: (result) => {
        //console.log(result);
        this.vendors = result;
      },
      error: ( err ) => console.error(err)

    })
  }

  openBasicModal(content: TemplateRef<any>, id: number) {
    this.goalsSelected = this.goals.filter( (goal) => goal.user_id === id);
    this.idVendorSelected= id;

    if(this.goalsSelected.length === 1) {
      this.goal = this.goalsSelected[0];
      this.setFormData();
      this.selectMonth();
    }
    if(this.goalsSelected.length > 0 ){
      this.buttonSave = 'Editar';
      this.isNew = false;
    }

    //console.log(this.goal);

    this._modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  setFormData(){
    if(this.goal !== undefined){
      this.formGoal.setValue({
        apr_goal: this.goal.apr_goal ? parseFloat(this.goal.apr_goal): '',
        apr_result: this.goal.apr_result ? parseFloat(this.goal.apr_result): '',
        aug_goal: this.goal.aug_goal ? parseFloat(this.goal.aug_goal): '',
        aug_result: this.goal.aug_result ? parseFloat(this.goal.aug_result): '',
        dec_goal: this.goal.dec_goal ? parseFloat(this.goal.dec_goal): '',
        dec_result: this.goal.dec_result ? parseFloat(this.goal.dec_result): '',
        feb_goal: this.goal.feb_goal ? parseFloat(this.goal.feb_goal): '',
        feb_result: this.goal.feb_result ? parseFloat(this.goal.feb_result): '',
        id: this.goal.id,
        jan_goal: this.goal.jan_goal ? parseFloat(this.goal.jan_goal): '',
        jan_result: this.goal.jan_result ? parseFloat(this.goal.jan_result): '',
        jul_goal: this.goal.jul_goal ? parseFloat(this.goal.jul_goal): '',
        jul_result: this.goal.jul_result ? parseFloat(this.goal.jul_result): '',
        jun_goal: this.goal.jun_goal ? parseFloat(this.goal.jun_goal): '',
        jun_result: this.goal.jun_result ? parseFloat(this.goal.jun_result): '',
        mar_goal: this.goal.mar_goal ? parseFloat(this.goal.mar_goal): '',
        mar_result: this.goal.mar_result ? parseFloat(this.goal.mar_result): '',
        may_goal: this.goal.may_goal ? parseFloat(this.goal.may_goal): '',
        may_result: this.goal.may_result ? parseFloat(this.goal.may_result): '',
        nov_goal: this.goal.nov_goal ? parseFloat(this.goal.nov_goal): '',
        nov_result: this.goal.nov_result ? parseFloat(this.goal.nov_result): '',
        oct_goal: this.goal.oct_goal ? parseFloat(this.goal.oct_goal): '',
        oct_result: this.goal.oct_result ? parseFloat(this.goal.oct_result): '',
        sep_goal: this.goal.sep_goal ? parseFloat(this.goal.sep_goal): '',
        sep_result: this.goal.sep_result ? parseFloat(this.goal.sep_result): '',
        type: this.goal.type,
        user_id: this.goal.user_id,
      })
    }
  }

  selectGoal(){
    let goalSearched = this.goals.find( (goal) => goal.id === parseInt(this.idGoal));

    if(goalSearched) {
      this.goal = goalSearched;

    }

    //console.log(this.idGoal);
    //console.log(this.goal);
    this.setFormData();
    this.selectMonth();
  }

  closeModal(){
    this._modalService.dismissAll();
    this.selectMonth();
    this.resetData();
  }

  save(event: Event){
    this.goal.jan_goal = this.formGoal.value.jan_goal;
    this.goal.feb_goal = this.formGoal.value.feb_goal;
    this.goal.mar_goal = this.formGoal.value.mar_goal;
    this.goal.apr_goal = this.formGoal.value.apr_goal;
    this.goal.may_goal = this.formGoal.value.may_goal;
    this.goal.jun_goal = this.formGoal.value.jun_goal;
    this.goal.jul_goal = this.formGoal.value.jul_goal;
    this.goal.aug_goal = this.formGoal.value.aug_goal;
    this.goal.sep_goal = this.formGoal.value.sep_goal;
    this.goal.oct_goal = this.formGoal.value.oct_goal;
    this.goal.nov_goal = this.formGoal.value.nov_goal;
    this.goal.dec_goal = this.formGoal.value.dec_goal;
    this.goal.type = this.formGoal.value.type;
    this.goal.user_id = this.idVendorSelected;
    this.goal.id = this.formGoal.value.id;

    console.log(this.goal);
    if(this.isNew){
      //console.log('Se va a guardar');
      this._goalsService.saveGoals(this.token, this.goal).subscribe({
        next: ( response ) => {
          console.log(response)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'La meta se ha guardado exitósamente',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        },
        error: ( error ) => {
          console.log(error)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Ocurrió un error',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      })
    } else {
      //console.log('Se va a editar');
      this._goalsService.updateGoals(this.token, this.goal, this.goal.id).subscribe({
        next: ( response ) => {
          //console.log(response)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'La meta se ha guardado exitósamente',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        },
        error: ( error ) => {
          console.log(error)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Ocurrió un error',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      })
    }

    this.closeModal();
    this.getGoals();
    this.getVendorsMarketing();

  }

  resetData(){
    this.resultGoal = 0;
    this.resultConstantGoal = 0;
    this.percentGoal = 0;
    this.assignedCurrentGoal = 0;
    this.isNew = true;
    this.isDataMonthAvailable = false;
    this.buttonSave = 'Guardar';
    this.formGoal.reset();
    this.formResult.reset();
    this.idGoal = '';
    this.goal = {
      apr_goal: '',
      apr_result: '',
      aug_goal: '',
      aug_result: '',
      dec_goal: '',
      dec_result: '',
      feb_goal: '',
      feb_result: '',
      id: 1,
      jan_goal: '',
      jan_result: '',
      jul_goal: '',
      jul_result: '',
      jun_goal: '',
      jun_result: '',
      mar_goal: '',
      mar_result: '',
      may_goal: '',
      may_result: '',
      nov_goal: '',
      nov_result: '',
      oct_goal: '',
      oct_result: '',
      sep_goal: '',
      sep_result: '',
      type: 1,
      user_id: 1,
    };
  }

  selectMonth(){
    const date = new Date(); // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    let currentMonthKey = this.utils.formatMonthForGoal(month, 'result');
    let currentMonthGoal = this.utils.formatMonthForGoal(month, 'goal');

    //console.log(currentMonthKey);
    this.setCurrentMonthData(currentMonthKey, currentMonthGoal);
  }

  changeMonth(event: Event){
    let monthString: string = (event.target as HTMLSelectElement ).value;
    let selectedMonth: keyof Goal = ((event.target as HTMLSelectElement ).value as keyof Goal);
    let selectedGoal: keyof Goal

    monthString = monthString.split('_')[0];
    selectedGoal = (`${monthString}_goal` as keyof Goal);

    this.setCurrentMonthData(selectedMonth, selectedGoal)

  }

  setCurrentMonthData(resultMonth: keyof Goal, goalMonth: keyof Goal){
    if(this.goal[goalMonth] !== null) {
      this.isDataMonthAvailable = true;
      this.assignedCurrentGoal = parseInt(this.goal[goalMonth]+'');

      if(this.goal[resultMonth] !== null) {
        this.resultConstantGoal = parseInt(this.goal[resultMonth]+'');
        this.resultGoal = this.resultConstantGoal;
        this.percentGoal = (this.resultGoal * 100 ) / this.assignedCurrentGoal;
      }

      this.formResult.patchValue({
        key: resultMonth,
      })
    } else {
      this.isDataMonthAvailable = false;
    }
  }

  saveResult(event: Event){
    this.goal = { ...this.goal, [this.formResult.value.key]: this.resultGoal }

    this._goalsService.updateGoals(this.token, this.goal, this.goal.id).subscribe({
      next: ( response ) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Se han actualizado correctamente las metas',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

      },
      error: ( error ) => {
        console.log( error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Ocurrió un error',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    })

    this.closeModal();
    this.getGoals();
    this.getVendorsMarketing();
  }

  calcResult(event: Event){
    let valueInput: string | number = (event.target as HTMLInputElement ).value;
    //console.log(valueInput);
    if(valueInput === '') valueInput = 0;

    valueInput = parseInt(valueInput+'')

    this.resultGoal = this.resultConstantGoal + valueInput;
    this.percentGoal = (this.resultGoal * 100) / this.assignedCurrentGoal;
  }

}
