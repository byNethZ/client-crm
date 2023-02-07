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

  getLinks(token: string, status: number, nextPage: number) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

    return this._http.get(`${global.url}/checklists/${status}?page=${nextPage}`, {headers: headers});
  }

  ///checklistStatus/{id}/{aprobed}

  createLink(data:Link, token: string) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/checklists`, data, {headers: headers})
  }

  deleteLink(id: string, token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.delete(`${global.url}/checklists/${id}`, {headers: headers})
  }

  changeStatusLink(id: string, token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/checklists/status/${id}`, '', {headers: headers})
  }

  getGif(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`https://api.giphy.com/v1/gifs/random?api_key=S6Fzm6zZKpoZtXyGoPJ3oRRiCVYJPRRy&tag=celebrating`, {headers: headers})
  }
}
