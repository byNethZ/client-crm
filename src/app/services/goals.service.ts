import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.interface';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(
    private _http: HttpClient
  ) { }

  getGoals(token: string) : Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/goals`, { headers: headers})
  }

  getGoalsByUser(token: string, id: number) : Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.get(`${global.url}/goals/${id}`, { headers: headers})
  }

  saveGoals(token: string, goal: Goal) : Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.post(`${global.url}/goals`, goal, { headers: headers})
  }

  updateGoals(token: string, goal: Goal, id: number) : Observable<any>{
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this._http.put(`${global.url}/goals/${id}`, goal, { headers: headers})
  }
}
