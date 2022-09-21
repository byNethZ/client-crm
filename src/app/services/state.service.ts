import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private _http: HttpClient
  ) { }

  getStates(states: number) : Observable <any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Accept', 'application/json');

    return this._http.get(`${global.url}/states/${states}`, {headers: headers})
  }
}
