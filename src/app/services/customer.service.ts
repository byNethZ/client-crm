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

  getCustomersByProperty(token: string, property: keyof Customer, idProperty: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customers/${property}/${idProperty}`, {
      headers: headers,
    });
  }

  getAllCustomers(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customers`, { headers: headers });
  }

  getAllProspects(token: string, page: string = `${global.url}/prospects?page=1`): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(page, { headers: headers });
  }

  delete(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.delete(`${global.url}/customers/${id}`, {
      headers: headers,
    });
  }

  getCustomer(id: string, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/customers/${id}`, {
      headers: headers,
    });
  }

  save(customer: any, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/customers`, customer, {
      headers: headers,
    });
  }

  update(id: number, customer: Customer, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/customers/${id}`, customer, {
      headers: headers,
    });
  }

  prospectRejected(id: number, notes: any, token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/customers/rejected/${id}`, notes, {
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

  changeVendor(id: number, status: number, token: string, req: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/change-vendor/${id}/${status}`, req, {
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
