import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http: HttpClient
  ) { }

  getJoke() : Observable<any> {
    return this._http.get('https://v2.jokeapi.dev/joke/Any');
  }

  getSalesData(token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/dashboard/sales`, {headers: headers});
  }

  getSalesDataByVendor(token: string, id: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/dashboard/sales/${id}`, {headers: headers});
  }

  getCustomersByVendor(token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/dashboard/customers/vendors`, {headers: headers});
  }

  getCustomerCurrentDay(token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/dashboard/customers/current`, {headers: headers});
  }
}
