import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor() { }

  getTokenData(): Observable<any> {
    const getToken = sessionStorage.getItem('token');
    return new Observable((Subscriber) =>{
      Subscriber.next(getToken);
    })
  }

  isTokenValid() {
    return new Promise(async (resolve) =>{
      this.getTokenData().subscribe((utoken) =>{
        if(utoken) {
          const expirytoken = JSON.parse(atob(utoken?.split('.')[1])).exp;
          if(expirytoken*1000 > Date.now()){
            resolve (true);
          }else{
            resolve (false);
          }
        }else{
          resolve (false);
        }
      })
    })
  }

  getUserData() {
    return new Promise(async (resolve) =>{
      this.getTokenData().subscribe((utoken) =>{
        if(utoken) {
          const uData = JSON.parse(atob(utoken?.split('.')[1]));
          resolve(uData);
        }else{
          resolve (null);
        }
      })
    })
  }
}
