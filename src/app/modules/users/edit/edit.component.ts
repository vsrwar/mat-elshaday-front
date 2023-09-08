import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserResponse } from 'src/app/models/responses/user.response';
import { UserEditRequest } from '../requests/user.edit.request';

@Component({
  selector: 'home-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class UserEditComponent implements OnInit{

  editUserForm: FormGroup = this.fb.group({email: [''], nickName: [''], role: [0], active: [false]});
  user: UserEditRequest = {} as UserEditRequest;

  constructor(protected service: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = Number.parseInt(this.route.snapshot.paramMap.get('id') || '0');
    if(userId && userId > 0) {
      this.service.getUser(userId)
        .subscribe({
          next: (user: UserResponse) => {
            this.user = {id: user.id, email: user.email, nickName: user.nickName, role: user.role, active: user.active };
            this.editUserForm = this.fb.group({
              email: [user.email, [Validators.required, Validators.email]],
              nickName: [user.nickName, Validators.required],
              role: [`${user.role}`, Validators.required],
              active: [user.active, Validators.required]
            });
          }
        });
    } else {
      this.router.navigate(['/users']);
    }
  }

  toggleActive(active: boolean) {
    this.user.active = active;
  }

  editUser(){
    if(!this.editUserForm?.valid) {
      this.snackBar.open('Fields are required', 'OK', { duration: 3000 });
      return;
    }

    this.user = Object.assign({}, this.user, this.editUserForm?.value);
    this.user!.role = parseInt(this.user!.role.toString());
    this.service.updateUser(this.user!)
      .subscribe({
        next: () => {
          this.snackBar.open('User successfully edited!', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/users']);
        }
      });
  }
}
