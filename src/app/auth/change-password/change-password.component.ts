import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from './services/change-password.service';
import { ChangePasswordModel } from './models/change-password.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  
  nickName: string | null = "";
  changePasswordForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ChangePasswordService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.nickName = this.route.snapshot.paramMap.get('nickname');

    if(!this.nickName || this.nickName === '') {
      this.router.navigate(['/']);
    }

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  changePassword() {
    const model: ChangePasswordModel = {
      nickName: this.nickName ?? "",
      password: this.changePasswordForm.value.password,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    }

    this.service.changePassword(model)
      .subscribe({
        next: (result: boolean) => {
          if(result) {
            this.snackBar.open('Password changed successfully', 'Ok', { duration: 3000 });
            this.router.navigate(['/login']);
          } else {
            this.snackBar.open('Unable to change password', 'Ok', { duration: 3000 });
          }
        }
      });
  }
}
