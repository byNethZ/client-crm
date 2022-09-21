import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class FotographyService {

  constructor(
    private _http: HttpClient
  ) { }

  getChecklist() : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`${global.url}/contract-fotography`, { headers: headers});
  }

  delete(id: number, token: string) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application')
      .set('Authorization', `Bearer ${token}`)

    return this._http.delete(`${global.url}/contract-fotography/${id}`, { headers: headers})
  }
}
