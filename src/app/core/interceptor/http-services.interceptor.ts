import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommanService } from '../../shared/services';

@Injectable()
export class httpServicesInterceptor implements HttpInterceptor {
    tokenv: any;
    constructor(private commanservice: CommanService) {}
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        (async () => {
            this.commanservice.getTokenData().subscribe((res) => {
                this.tokenv = res;
            });
        })();
        if (this.tokenv) {
            const newHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                token: this.tokenv,
            });
            //clone request and change header
            let clone = request.clone({ headers: newHeaders });
            return next.handle(clone);
        } else {
            let clone = request.clone({  });
            return next.handle(clone);
        }
    }
}
