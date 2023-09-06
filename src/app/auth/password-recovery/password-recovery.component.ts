import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit{
  
  passwordRecoveryForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder,
    private service: PasswordRecoveryService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.passwordRecoveryForm = this.fb.group({
      nickname: ['', [Validators.required]]
    });
  }

  checkNickName() {
    if(!this.passwordRecoveryForm.value.nickname || this.passwordRecoveryForm.value.nickname === '') {
      this.snackBar.open('Nickname is required', 'OK', { duration: 3000 });
      return;
    }

    this.service.checkNickName(this.passwordRecoveryForm.value.nickname)
      .subscribe({
        next: (response: boolean) => {
          if(response) {
            this.router.navigate(['/change-password', this.passwordRecoveryForm.value.nickname]);
          } else {
            this.snackBar.open('Unable to change this user password, contact support', 'OK', { duration: 3000 });
          }
        },
        error: (err: any) => {
          this.snackBar.open(err.error, 'OK', { duration: 3000 });
        }
      });
  }

}
