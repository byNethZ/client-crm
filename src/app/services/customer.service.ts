import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { global } from './global';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private _http: HttpClient) {}

  getCustomers(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customersByVendor`, {
      headers: headers,
    });
  }

  getCustomersByStatus(token: string, status: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customersByStatus/${status}`, {
      headers: headers,
    });
  }

  getCustomersByIndustry(token: string, industry: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customers/industry/${industry}`, {
      headers: headers,
    });
  }

  getAllCustomers(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customers`, { headers: headers });
  }

  delete(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.delete(`${global.url}/delete-customer/${id}`, {
      headers: headers,
    });
  }

  getCustomer(id: string, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customer/${id}`, {
      headers: headers,
    });
  }

  save(customer: any, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/customer`, customer, {
      headers: headers,
    });
  }

  update(id: number, customer: Customer, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/customer/${id}`, customer, {
      headers: headers,
    });
  }

  updateInterests(id: number, data: any, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/interests/${id}`, data, {
      headers: headers,
    });
  }

  changeStatus(id: number, status: number, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/customerStatus/${id}/${status}`,'', {
      headers: headers,
    });
  }

  uploadImage(token: string, id: number, image: any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/customerImage/${id}`, image, {
      headers: headers,
    });
  }
}
