import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

  deleteProductsData(id:any): Observable<any> {
    return this.http.delete(`${environment.api_url1}/products/${id}`);
  }

  getDashboardData(): Observable<any> {
    return this.http.get(`${environment.local_url}/assets/api/dashboard.json`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  getRecentSalesData(): Observable<any> {
    return this.http.get(`${environment.local_url}/assets/api/recent-sales.json`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  getSalesOverviewData(): Observable<any> {
    return this.http.get(`${environment.local_url}/assets/api/salesoverview.json`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  getBestSalesData(): Observable<any> {
    return this.http.get(`${environment.local_url}/assets/api/best-selling.json`).pipe(map((res: any) =>{
      return res?.data;
    }));
  }

  getNotificationData(): Observable<any> {
    return this.http.get(`${environment.local_url}/assets/api/notifications.json`).pipe(map((res: any) =>{
      return res?.data;
    }));
  } 
}
