import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }
      
  getTotalDepartments(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/Department/count-actives`);
  }
      
  getTotalUsers(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/User/count-actives`);
  }
      
  getTotalLegalPeople(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/LegalPerson/count-actives`);
  }
      
  getTotalPhysicalPeople(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/PhysicalPerson/count-actives`);
  }
}
