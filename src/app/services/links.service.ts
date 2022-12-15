import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../models/link.interface';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(
    private _http: HttpClient
  ) { }

  getLinks(token: string, id : string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

    return this._http.get(`${global.url}/all-checklist/${id}`, {headers: headers});
  }

  getLinksByStatus(token: string, id : string, status: string|number) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

    return this._http.get(`${global.url}/checklistStatus/${id}/${status}`, {headers: headers});
  }

  ///checklistStatus/{id}/{aprobed}

  createLink(data:Link, token: string) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/create-checklist`, data, {headers: headers})
  }

  deleteLink(id: string, token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.delete(`${global.url}/delete-link/${id}`, {headers: headers})
  }

  changeStatusLink(id: string, token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/change-link/${id}`, '', {headers: headers})
  }

  getGif(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`https://api.giphy.com/v1/gifs/random?api_key=S6Fzm6zZKpoZtXyGoPJ3oRRiCVYJPRRy&tag=celebrating`, {headers: headers})
  }
}
