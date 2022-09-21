import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CataloguesService {

  constructor(
    private _http: HttpClient
  ) { }

  getCatalogues(token: string) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                  .set('Authorization', `Bearer ${token}`)
                  .set('Accept', 'application/json');

    return this._http.get(`${global.url}/catalogos`, {headers: headers})
  }
}
