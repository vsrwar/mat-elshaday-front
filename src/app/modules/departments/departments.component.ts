import { Component, OnInit } from '@angular/core';
import { DepartmentResponse } from './responses/department.response';
import { DepartmentService } from './services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paged } from 'src/app/models/paged.model';
import { ConfirmActionDialogComponent } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'home-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments: DepartmentResponse[] = [];
  totalDepartments: number = 0;
  displayedColumns: string[] = ['id', 'name', 'responsableName', 'actions'];

  constructor(protected service: DepartmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDepartments(1, 10);
  }

  loadDepartments(page: number, pageSize: number) {
    this.service.getDepartments()
      .subscribe((data: Paged<DepartmentResponse>) => {
        this.departments = data.entities;
        this.totalDepartments = data.total;
      });
  }

  delete(id: number) {
    this.dialog.open(ConfirmActionDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    })
      .afterClosed()
      .subscribe(result => {
        if(!result) return;

        this.service.deleteDepartment(id)
          .subscribe({
            next: () => {
              this.snackBar.open('Department deleted successfully', 'Ok', { duration: 3000 });
              this.departments = this.departments.filter(x => x.id !== id);
            }
          });
      });
  }

  handlePageEvent(event: PageEvent) {
    this.loadDepartments(event.pageIndex + 1, event.pageSize);
  }
}
