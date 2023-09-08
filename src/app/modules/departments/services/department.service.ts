import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { DepartmentForLegalPersonRequest } from '../requests/department-for-legal-person.request';
import { DepartmentResponse } from '../responses/department.response';
import { DepartmentForPhysicalPersonRequest } from '../requests/department-for-physical-person.request';
import { Paged } from 'src/app/models/paged.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = `${environment.apiUrl}/Department`;

  constructor(private http: HttpClient) { }

  createDepartmentForLegalPerson(request: DepartmentForLegalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .post<DepartmentResponse>(`${this.baseUrl}/for-legal-person`, request);
  }
  
  createDepartmentForPhysicalPerson(request: DepartmentForPhysicalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .post<DepartmentResponse>(`${this.baseUrl}/for-physical-person`, request);
  }
    
  getDepartment(id: number): Observable<DepartmentResponse> {
    return this.http
      .get<DepartmentResponse>(`${this.baseUrl}/${id}`);
  }
    
  getDepartments(page: number = 1, pageSize: number = 25): Observable<Paged<DepartmentResponse>> {
    return this.http
      .get<Paged<DepartmentResponse>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }
  
  updateDepartmentForLegalPerson(request: DepartmentForLegalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .put<DepartmentResponse>(`${this.baseUrl}/for-legal-person`, request);
  }
  
  updateDepartmentForPhysicalPerson(request: DepartmentForPhysicalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .put<DepartmentResponse>(`${this.baseUrl}/for-physical-person`, request);
  }
    
  deleteDepartment(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`);
  }
}
