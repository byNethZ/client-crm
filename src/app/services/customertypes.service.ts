import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CustomertypesService {

  constructor(
    private _http: HttpClient
  ) { }

  getCustomerTypes(token: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return this._http.get(`${global.url}/types`, { headers: headers});
  }

  getIndustryById(token: string, id: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);
    return this._http.get(`${global.url}/types/${id}`, { headers: headers})
  }
}
