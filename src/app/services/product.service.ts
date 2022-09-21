import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient
  ) { }

  getProducts(token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

    return this._http.get(`${global.url}/products`, {headers: headers});
  }

  getProduct(token: string, id: number) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

    return this._http.get(`${global.url}/product/${id}`, {headers: headers});
  }

  getProductCategories(token: string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

    return this._http.get(`${global.url}/categories`, {headers: headers});
  }
}
