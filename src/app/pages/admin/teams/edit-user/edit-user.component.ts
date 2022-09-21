import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public idUser: string | null = null;
  public form: FormGroup;
  public formPassword: FormGroup;
  public user: User;
  public token: string | null = localStorage.getItem('token');
  public departamentUser : number | null = parseInt(localStorage.getItem('departament_id')!);
  public departament : string | null;
  public departaments: any[];
  public isEdit : boolean = true;

  constructor(
    fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role_id: new FormControl('', [Validators.required]),
      departament_id: new FormControl('', [Validators.required]),
      departament_alt_id: new FormControl(''),
      description: new FormControl(''),
      personal_phone: new FormControl('', [Validators.required]),
      public_phone: new FormControl(''),
    });
    this.formPassword = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getDepartaments();
  }

  getUser() {
    this.idUser = this._route.snapshot.paramMap.get('id');

    if(this.idUser){
      this._userService.getUser(this.idUser, this.token!).subscribe(
        response => {

          this.user = response.user;
          this.departament = response.departament;
          this.form = new FormGroup({
            name: new FormControl(this.user.name, [Validators.required]),
            lastname: new FormControl(this.user.lastname, [Validators.required]),
            email: new FormControl(this.user.email, [Validators.required]),
            role_id: new FormControl(this.user.role_id, [Validators.required]),
            departament_id: new FormControl(this.user.departament_id, [Validators.required]),
            departament_alt_id: new FormControl(this.user.departament_alt_id),            personal_phone: new FormControl(this.user.personal_phone, [Validators.required]),
            public_phone: new FormControl(this.user.public_phone),
          })


        },
        error => {
          console.log(error);

        }
      )
    }

  }

  save(evt: Event){
    evt.preventDefault();
    this.user.name = this.form.value.name;
    this.user.lastname = this.form.value.lastname;
    this.user.email = this.form.value.email;
    this.user.role_id = this.form.value.role_id;
    this.user.departament_id = this.form.value.departament_id;
    this.user.departament_alt_id = this.form.value.departament_alt_id ? this.form.value.departament_alt_id : '';
    this.user.personal_phone = this.form.value.personal_phone;
    this.user.public_phone = this.form.value.public_phone ? this.form.value.public_phone : '';

    if(this.user.token === 'N/A' || !this.user.token) {
      this.user.token = this.generateToken();

    }

    this._userService.update(this.idUser!, this.token!, this.user).subscribe(
      response => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'El usuario se ha editado correctamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        this._router.navigate([`/admin/team`]);
      },
      error => {
        console.log(error);

      }
    )
  }

  changePassword(evt: Event){
    evt.preventDefault();
    this.user.password = this.formPassword.value.password;
    this._userService.resetPassword(this.idUser!, this.token!, this.user).subscribe(
      response => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'La contraseña se ha cambiado correctamente',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        this._router.navigate([`/admin/team`]);
      },
      error => {
        console.log(error);
      }
    )
  }

  private random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
  }

  generateToken() {
    return this.random() + this.random(); // Para hacer el token más largo
  }

  getDepartaments(){
    this._userService.getDepartaments(this.token!).subscribe(
      response => {
        this.departaments = response;

      },
      error => {
        console.log(error);

      }
    )
  }

}
