import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.dev";
import { ChangePasswordModel } from "../models/change-password.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  
  baseUrl: string = `${environment.apiUrl}/User/change-password`;

  constructor(private http: HttpClient) {}

  changePassword(changePassword: ChangePasswordModel): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, changePassword);
  }
}