import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { global } from './global';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuth: boolean;
  public token: any;
  public user: User;

  constructor(private _http: HttpClient) {
    this.isAuth = false;
  }

  public login(user: User): Observable<void> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http
      .post<any>(`${global.url}/login`, user, { headers: headers })
      .pipe(
        map((res) => {
          //console.log(res);
          //this.user = res;
          this.saveDataLocal(res);
          this.isAuth = true;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  /* verify token valid and routing panel */
  public checkToken(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http
      .post(`${global.url}/validateToken`, '', { headers: headers })
      .pipe(
        map((res) => {
          //console.log(res);
          this.isAuth = true;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  public logout(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('departament_id');
    localStorage.removeItem('role_id');
    localStorage.removeItem('vendor_id');
    localStorage.removeItem('departament_alt_id');
    this.isAuth = false;

    return this._http.post(`${global.url}/logout`, '', { headers: headers });
  }

  public userLogged(): boolean {
    return (this.isAuth = this.checkDataLocal());
  }

  private checkDataLocal(): boolean {
    if (
      localStorage.getItem('id') != null &&
      localStorage.getItem('token') != null
    ) {
      return true;
    }
    return false;
  }

  private saveDataLocal(data: any): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id.toString());
    localStorage.setItem('name', data.name);
    localStorage.setItem('departament_id', data.departament_id);
    localStorage.setItem('role_id', data.role_id);

    if (data.vendor_id) {
      localStorage.setItem('vendor_id', data.vendor_id);
    }

    if (data.departament_alt_id) {
      localStorage.setItem('departament_alt_id', data.departament_alt_id);
    }
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error ocurred retrieving data';
    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }

    return throwError(errorMessage);
  }

  public info(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/info`, { headers: headers });
  }

  public getVendorID(): number | null {
    let vendor_id: number | null = null;
    if (localStorage.getItem('vendor_id')) {
      vendor_id = parseInt(localStorage.getItem('vendor_id')!);
    }
    return vendor_id;
  }

  getUsers(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/users`, { headers: headers });
  }

  getDataLocal(user: User): User {
    //user.role_id = parseInt(localStorage.getItem('role_id')!);
    user.id = parseInt(localStorage.getItem('id')!);
    user.name = localStorage.getItem('name')!;
    user.departament_id = parseInt(localStorage.getItem('departament_id')!);
    user.token = localStorage.getItem('token')!;
    return user;
  }

  getUser(id: string, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get<any>(`${global.url}/user/${id}`, {
      headers: headers,
    });
  }

  delete(id: string, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.delete(`${global.url}/delete-user/${id}`, {
      headers: headers,
    });
  }

  getDepartaments(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/departaments`, { headers: headers });
  }
  //publicDepartaments

  getPublicDepartaments(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/publicDepartaments`, {
      headers: headers,
    });
  }

  resetPassword(id: string, token: string, user: User): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/password/${id}`, user, {
      headers: headers,
    });
  }

  update(id: string, token: string, user: User): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/edit-user/${id}`, user, {
      headers: headers,
    });
  }

  create(token: string, user: User): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/user`, user, { headers: headers });
  }

  activateSystem(token: string, id: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/notifications/${id}`, '', { headers: headers });
  }
}
