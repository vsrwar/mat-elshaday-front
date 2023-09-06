import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '../models/login.response';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private service: LoginService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.verifyAlreadyLogged();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }) 
  }

  verifyAlreadyLogged() {
    if(this.sessionStorageService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if(!this.loginForm.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    this.service.login(this.loginForm.value)
      .subscribe({
        next: (response: LoginResponse) => {
          this.snackBar.open(`Welcome ${response.user.nickName}`, 'OK', { duration: 3000 });
          this.sessionStorageService.saveUser(response);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          this.snackBar.open(err.error, 'OK', { duration: 3000 });
        }
      });
  }
}
