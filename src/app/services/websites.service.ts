import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Website } from '../models/website.interface';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  constructor(
    private _http: HttpClient
  ) { }

  getWebsites(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/websites`, {headers: headers});
  }

  updateWebsite(token: string, website: Website, id: number) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/websites/${id}`, website, {headers: headers});
  }

  deleteWebsite(token: string, id: number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.delete(`${global.url}/websites/${id}`, {headers: headers});
  }

  createWebsite(token: string, website: Website): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/websites`, website, {headers: headers});
  }
}
