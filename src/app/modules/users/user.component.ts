import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserResponse } from 'src/app/models/responses/user.response';
import { UsersService } from './services/users.service';
import { Paged } from 'src/app/models/paged.model';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionDialogComponent } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'home-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  
  users: UserResponse[] = [];
  totalUsers: number = 0;
  color: ThemePalette = 'primary';
  displayedColumns: string[] = ['id', 'email', 'nickName', 'active', 'role', 'actions'];

  constructor(private service: UsersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers(1, 10);
  }

  loadUsers(pange: number, pageSize: number) {
    this.service.getUsers(pange, pageSize)
      .subscribe((data: Paged<UserResponse>) => {
        this.users = data.entities;
        this.totalUsers = data.total;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.loadUsers(event.pageIndex + 1, event.pageSize);
  }

  delete(id: number) {
    this.dialog.open(ConfirmActionDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    })
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.service.deleteUser(id)
            .subscribe(() => {
              this.users = this.users.filter(u => u.id != id);
              this.snackBar.open('User successfully deleted!', 'Ok', { duration: 3000 });
            });
        }
      });
  }
  
  toggleActive(user: UserResponse) {
    if(user.active) {
      this.service.deactivateUser(user.id)
        .subscribe(() => {
          this.snackBar.open(`User ${user.nickName} successfully deactivated!`, 'Ok', { duration: 3000 });
          this.users.filter(u => u.id == user.id)[0].active = false;
        });
    } else {
      this.service.activateUser(user.id)
        .subscribe(() => {
          this.snackBar.open(`User ${user.nickName} successfully activated!`, 'Ok', { duration: 3000 });
          
          this.users.filter(u => u.id == user.id)[0].active = true;
        });
    }
  }

  getStringRole(role: number): string {
    switch (role) {
      case 1:
        return 'Administrator';
      case 2:
        return 'Common';
      default:
        return 'Unknown';
    }
  }
}
