import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

import { SessionStorageService } from './services/session-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpsRequestInterceptor implements HttpInterceptor {
  private isLoggedIn = false;

  constructor(private storageService: SessionStorageService,
    private snackBar: MatSnackBar) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn && req.url.indexOf('viacep') < 0) {
      const token = this.storageService.getToken();
      const dupReq = req.clone({
        setHeaders: {
          'Accept': '*/*',
          'Content-Type': 'application/json; x-api-version=1',
          'Authorization': token ? 'Bearer ' + token : ''
        }
       });

       return next.handle(dupReq).pipe(catchError(err => this.erroHandler(err)));
    } else {
      return next.handle(req).pipe(catchError(err => this.erroHandler(err)));
    }
  }

  erroHandler(err: HttpErrorResponse) {
    if([400].includes(err.status)) {
      if(err.error.errors) {
        this.snackBar.open(JSON.stringify(err.error.errors), 'OK', { duration: 5000 });
      } else {
        this.snackBar.open(err.error, 'OK', { duration: 3000 });
      }
    }        
    else if([401, 403].includes(err.status)) {
      this.snackBar.open(`Unauthorized. ${err.error}`, 'OK', { duration: 3000 });
    }
    else if([404].includes(err.status)) {
      this.snackBar.open('Not found.', 'OK', { duration: 3000 });
    }
    else if([0, 500].includes(err.status)) {
      this.snackBar.open(`Server erro. Please, try again later. ${err.message}`, 'OK', { duration: 3000 });
    }
    return throwError(() => undefined);
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