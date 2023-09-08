import { Injectable } from '@angular/core';
import { LoginResponse } from '../auth/models/login.response';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../models/enums/role.enum';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  USER_KEY = 'user';
  ACCESS_TOKEN_KEY = 'access_token';

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService) { }

  logout(): void {
    this.snackBar.open('Bye bye', 'OK', { duration: 3000 });
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  saveUser(user: LoginResponse): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(this.ACCESS_TOKEN_KEY, user.token);
  }

  getUser(): LoginResponse | null {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    if(!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const login = this.getUser();
    return login?.user?.role === Role.Admin || false;
  }
}