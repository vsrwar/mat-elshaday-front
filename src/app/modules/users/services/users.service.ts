import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paged } from 'src/app/models/paged.model';
import { UserResponse } from 'src/app/models/responses/user.response';
import { environment } from 'src/environments/environment.dev';
import { UserRequest } from '../requests/user.request';
import { UserEditRequest } from '../requests/user.edit.request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  baseUrl = `${environment.apiUrl}/User`;

  createUser(request: UserRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.baseUrl, request);
  }
    
  getUser(id: number): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${this.baseUrl}/${id}`);
  }
    
  getUsers(page: number = 1, pageSize: number = 25): Observable<Paged<UserResponse>> {
    return this.http
      .get<Paged<UserResponse>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }
  
  updateUser(request: UserEditRequest): Observable<UserResponse> {
    return this.http
      .put<UserResponse>(this.baseUrl, request);
  }
    
  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`);
  }

  activateUser(id: number): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/activate/${id}`, {});
  }
  deactivateUser(id: number): Observable<any>  {
    return this.http
      .post<any>(`${this.baseUrl}/deactivate/${id}`, {});
  }
}
