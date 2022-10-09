import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    private _http: HttpClient
  ) { }

  public sendReport(mode: string = 'day', id: number, token: string){
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/reports/${id}/${mode}`, { headers: headers })
  }
}
