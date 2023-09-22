import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root',
})
export class AssistService {
  public headers: HttpHeaders;
  public token: string = localStorage.getItem('token')!;

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`)
      .set('Accept', 'application/json');
  }

  getAssists(event: string): Observable<any> {
    return this._http.get(`${global.url}/assist/${event}`, {
      headers: this.headers,
    });
  }
}
