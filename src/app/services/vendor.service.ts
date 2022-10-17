import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private _http: HttpClient
  ) { }

  getVendors( token : string ) :Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/vendors`, { headers: headers});
  }

  getVendorsAndMarketing(token : string) :Observable<any> {
      let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/marketingvendors`, { headers: headers});
  }
}
