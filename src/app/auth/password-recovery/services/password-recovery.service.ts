import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  
  baseUrl = `${environment.apiUrl}/Login`;
  constructor(private http: HttpClient) { }

  checkNickName(nickName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/CheckNickNameForPasswordRecovery/${nickName}`);
  }
}
