import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { AddressRequest } from '../requests/address.request';
import { PhysicalPersonRequest } from '../requests/physical-person.request';
import { PhysicalPersonResponse } from '../responses/physical-person.response';
import { Paged } from 'src/app/models/paged.model';
import { LegalPersonRequest } from '../requests/legal-person.request';
import { LegalPersonResponse } from '../responses/legal-person.response';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
  
    baseLegalPersonUrl = `${environment.apiUrl}/LegalPerson`;
    basePhysicalPersonUrl = `${environment.apiUrl}/PhysicalPerson`;
    baseViaCepUrl = `${environment.viaCepUrl}`;

    getAddressesByCep(cep: string): Observable<AddressRequest> {
      return this.http
        .get<AddressRequest>(`${this.baseViaCepUrl}/${cep}/json/`);
    }

    // For Physical person
    createPhysicalPerson(request: PhysicalPersonRequest): Observable<PhysicalPersonResponse> {
      return this.http
        .post<PhysicalPersonResponse>(this.basePhysicalPersonUrl, request);
    }
      
    getPhysicalPerson(id: number): Observable<PhysicalPersonResponse> {
      return this.http
        .get<PhysicalPersonResponse>(`${this.basePhysicalPersonUrl}/${id}`);
    }
      
    getPhysicalPeople(page: number = 1, pageSize: number = 25): Observable<Paged<PhysicalPersonResponse>> {
      return this.http
        .get<Paged<PhysicalPersonResponse>>(`${this.basePhysicalPersonUrl}?page=${page}&pageSize=${pageSize}`);
    }
    
    updatePhysicalPerson(request: PhysicalPersonRequest): Observable<PhysicalPersonResponse> {
      return this.http
        .put<PhysicalPersonResponse>(this.basePhysicalPersonUrl, request);
    }
      
    deletePhysicalPerson(id: number): Observable<any> {
      return this.http
        .delete<any>(`${this.basePhysicalPersonUrl}/${id}`);
    }

    getPhysicalPeopleForDepartments(): Observable<PhysicalPersonResponse[]> {
      return this.http
        .get<PhysicalPersonResponse[]>(`${this.basePhysicalPersonUrl}/available-for-department`);
    }

    // For legal person
    createLegalPerson(request: LegalPersonRequest): Observable<LegalPersonResponse> {
      return this.http
        .post<LegalPersonResponse>(this.baseLegalPersonUrl, request);
    }
      
    getLegalPerson(id: number): Observable<LegalPersonResponse> {
      return this.http
        .get<LegalPersonResponse>(`${this.baseLegalPersonUrl}/${id}`);
    }
      
    getLegalPeople(page: number = 1, pageSize: number = 25): Observable<Paged<LegalPersonResponse>> {
      return this.http
        .get<Paged<LegalPersonResponse>>(`${this.baseLegalPersonUrl}?page=${page}&pageSize=${pageSize}`);
    }
    
    updateLegalPerson(request: LegalPersonRequest): Observable<LegalPersonResponse> {
      return this.http
        .put<LegalPersonResponse>(this.baseLegalPersonUrl, request);
    }
      
    deleteLegalPerson(id: number): Observable<any> {
      return this.http
        .delete<any>(`${this.baseLegalPersonUrl}/${id}`);
    }

    getLegalPeopleForDepartments(): Observable<LegalPersonResponse[]> {
      return this.http
        .get<LegalPersonResponse[]>(`${this.baseLegalPersonUrl}/available-for-department`);
    }
}
