import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { LoginRequest } from './models/login.request';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/login.response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = `${environment.apiUrl}/Login`;
  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl, request);
  }
}
