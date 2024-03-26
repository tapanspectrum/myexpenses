import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginObj: any): Observable<any> {
    return this.http.post(`${environment.api_url}/auths/login`, loginObj);
  }
}
