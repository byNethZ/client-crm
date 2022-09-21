import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public returnUrl: any;
  public form: FormGroup;
  public user: User;
  public token: string | null;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.user = {
      personal_phone: '',
      public_phone: '',
      id: 1,
      name: '',
      lastname: '',
      role_id: 1,
      email: '',
      password: '',
      avatar: '',
      token: '',
      departament_alt_id: '',
      departament_id: 1,
    };
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = '/dashboard'
    this.checkToken();
  }

  login(e: Event) {
    e.preventDefault();
    //this._userService.login
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this._userService.login(this.user).subscribe(
      response => {
        //console.log(response);
        this.router.navigate([this.returnUrl]);

      },
      error => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'E-mail o Password Incorrectos. Favor de verificar',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        this.form.reset();

      }
    )
    // localStorage.setItem('isLoggedin', 'true');
    // if (localStorage.getItem('isLoggedin')) {
    // }
  }

  checkToken(){
    this.token = localStorage.getItem('token')!;
    //console.log(this.token);


    if(this.token){
      this._userService.checkToken(this.token).subscribe(
        response => {
          //console.log(response);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        }
      )
    }
    else{
      return;
    }

  }
}
