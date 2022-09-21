import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './../edit-user/edit-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public isEdit: boolean = false;
  public form: FormGroup;
  public formPassword: FormGroup;
  public user: User;
  public token: string | null = localStorage.getItem('token');
  public departamentUser: number | null = parseInt(localStorage.getItem('departament_id')!);
  public departaments: any[];

  constructor(
    private fb: FormBuilder,
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
      password: new FormControl('', [Validators.required]),
    });
    this.formPassword = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
    this.user = {
      name: '',
      lastname: '',
      email: '',
      role_id: 1,
      departament_id: 1,
      departament_alt_id: '',
      password: '',
      personal_phone: '',
      public_phone: '',
      token: '',
      id: 1,
      avatar: ''
    }
   }

  ngOnInit(): void {
    this.getDepartaments();
  }

  changePassword(evt: Event): void {}

  save(evt: Event): void {
    evt.preventDefault();

    this.user.name = this.form.value.name;
    this.user.lastname = this.form.value.lastname;
    this.user.email = this.form.value.email;
    this.user.role_id = this.form.value.role_id;
    this.user.departament_id = this.form.value.departament_id;
    this.user.departament_alt_id = this.form.value.departament_alt_id;
    this.user.personal_phone = this.form.value.personal_phone;
    this.user.public_phone = this.form.value.public_phone;
    this.user.password = this.form.value.password;

    this.user.token = this.generateToken();

    this._userService.create(this.token!, this.user).subscribe(
      response => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Se ha creado al usuario correctamente',
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
