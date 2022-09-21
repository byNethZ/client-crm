import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;
  public token: string | null = localStorage.getItem('token');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private _userService: UserService
  ) {
    this.user = {
      personal_phone: '',
      public_phone: '',
      id: 1,
      name: '',
      lastname: '',
      role_id: parseInt(localStorage.getItem('role_id')!),
      email: '',
      password: '',
      departament_id: 1,
      departament_alt_id: '',
      avatar: '',
      token: '',
    }
  }

  ngOnInit(): void {
    this.getDataLocal();

  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
    this._userService.logout(this.user.token)

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  getDataLocal() {
    //this.user.role_id = parseInt(localStorage.getItem('role_id')!);
    this._userService.getDataLocal(this.user);
    this._userService.info(this.token!).subscribe(
      response => {
        //console.log(response)
        this.user = response;
      },
      error => {
        console.log(error)
      }
    )

  }
}
