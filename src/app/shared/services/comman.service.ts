import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Injectable({
    providedIn: 'root',
})
export class CommanService {
    subject$ = new Subject();
    getbnIdle: any;
    isLoggedIn = false;
    userSub = new BehaviorSubject<any>(null);
    clearTimeout: any;

    constructor( private router: Router, private idle: Idle, private keepalive: Keepalive) {
      idle.setIdle(900);
    //   idle.setTimeout(5);
    //   idle.onTimeout.subscribe(() => {
    //     alert('TimeOut ');
    //   });

      idle.onIdleStart.subscribe(() => {
        this.logout();
      });
    }

    closemodel(): void {
        this.subject$.next(true);
    }

    getTokenData(): Observable<any> {
        const getToken = sessionStorage.getItem('token');
        return new Observable((Subscriber) => {
            Subscriber.next(getToken);
        });
    }

    isTokenValid() {
        return new Promise(async (resolve) => {
            this.getTokenData().subscribe((utoken) => {
                if (utoken) {
                    const expirytoken = JSON.parse(
                        atob(utoken?.split('.')[1])
                    ).exp;
                    if (expirytoken * 1000 > Date.now()) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        });
    }

    getUserData() {
        return new Promise(async (resolve) => {
            this.getTokenData().subscribe((utoken) => {
                if (utoken) {
                    const uData = JSON.parse(atob(utoken?.split('.')[1]));
                    resolve(uData);
                } else {
                    resolve(null);
                }
            });
        });
    }

    // checkIdleState(): any {
    //    this.checkIdleState = this.bnIdle.startWatching(20).subscribe((isTimedOut: boolean) => {
    //         if (isTimedOut) {
    //             console.log('session expired');
    //         }
    //     });
    // }

    autoLogout(expirationDate: number) {
        this.clearTimeout = setTimeout(() => {
            this.logout();
        }, expirationDate);
    }

    userIdleState(): any {
      console.log('idle inside');
    //   this.idle.watch();
    }

    runTimeOutInterval(users: any) {
        // const todaysDate = new Date().getTime();
        // const expirationDate = users.exp * 1000;
        // const timeInterval = expirationDate - todaysDate;
        // this.clearTimeout = setTimeout(() => {
        //     this.logout();
        // }, timeInterval);
    }

    logout() {
        this.userSub.next(null);
        this.router.navigate(['/login']);
        sessionStorage.removeItem('token');
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
        }
    }
}
