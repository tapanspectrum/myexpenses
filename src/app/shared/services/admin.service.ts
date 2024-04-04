import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  // http://82.180.160.182:3001/users
  getUserData(): Observable<any> {
    return this.http.get(`${environment.api_url}/users`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  getCategoriesData(): Observable<any> {
    return this.http.get(`${environment.api_url1}/categories`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  getProductsData(): Observable<any> {
    return this.http.get(`${environment.api_url1}/products`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  editProductsData(id:any,  params: any): Observable<any> {
    return this.http.put(`${environment.api_url1}/products/${id}`, params);
  }

  deleteProductsData(id:any): Observable<any> {
    return this.http.delete(`${environment.api_url1}/products/${id}`);
  }

}
