import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(
    private _http: HttpClient
  ) { }

  public getPromos(token:string) : Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return this._http.get(`${global.url}/promos`, {headers: headers})
  }

  public getRuleta(token:string) : Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return this._http.get(`${global.url}/ruleta`, {headers: headers})
  }

  public setDelivered(token: string, id: number) : Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return this._http.put(`${global.url}/ruleta/${id}`, '', {headers: headers})

  }
}
