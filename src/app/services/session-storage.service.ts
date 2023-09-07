import { Injectable } from '@angular/core';
import { LoginResponse } from '../auth/models/login.response';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../models/enums/role.enum';


@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  USER_KEY = 'user';

  constructor(private router: Router,
    private snackBar: MatSnackBar) { }

  logout(): void {
    this.snackBar.open('Bye bye', 'OK', { duration: 3000 });
    window.sessionStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  saveUser(user: LoginResponse): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): LoginResponse | null {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  isAdmin(): boolean {
    const login = this.getUser();
    return login?.user?.role === Role.Admin || false;
  }
}