import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from '../requests/user.request';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'home-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class UserCreateComponent {

  createUserForm: FormGroup = new FormGroup({});
  user: UserRequest = { email: '', nickName: '', password: '', confirmPassword: '', role: 0, active: false };

  constructor(protected service: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  createUser(){
    if(!this.createUserForm?.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    this.user = Object.assign({}, this.user, this.createUserForm?.value);
    this.user.role = parseInt(this.user.role.toString());
    this.service.createUser(this.user)
      .subscribe({
        next: () => {
          this.snackBar.open('User successfully created!', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/users']);
        }
      });
  }
}
