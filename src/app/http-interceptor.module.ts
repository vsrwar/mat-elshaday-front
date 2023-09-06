import { Injectable, NgModule } from '@angular/core';
import {  HttpEvent,  HttpInterceptor,  HttpHandler,  HttpRequest} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from './services/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class HttpsRequestInterceptor implements HttpInterceptor {
    private isLoggedIn = false;

    constructor(private storageService: SessionStorageService){
        this.isLoggedIn = this.storageService.isLoggedIn();
      }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.isLoggedIn = this.storageService.isLoggedIn();
        if(this.isLoggedIn){
            const user = this.storageService.getUser();
            const dupReq = req.clone({
                setHeaders: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json; x-api-version=1',
                    'Authorization': (user && user.token) ? 'Bearer ' + user.token : ''
                }
             });
             return next.handle(dupReq);
        }else{
            return next.handle(req);
        }
   }
}
@NgModule({
   providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
   }]
})
export class Interceptor { }