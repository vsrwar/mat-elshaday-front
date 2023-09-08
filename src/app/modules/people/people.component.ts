import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paged } from 'src/app/models/paged.model';
import { PeopleService } from './services/people.service';
import { PhysicalPersonResponse } from './responses/physical-person.response';
import { LegalPersonResponse } from './responses/legal-person.response';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmActionDialogComponent } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'home-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  physicalPeople: PhysicalPersonResponse[] = [];
  legalPeople: LegalPersonResponse[] = [];
  displayedPhysicalPersonColumns: string[] = ['id', 'qualifier', 'cpf', 'name', 'nickName', 'actions'];
  displayedLegalPersonColumns: string[] = ['id', 'qualifier', 'cnpj', 'corporateName', 'fantasyName', 'actions'];
  totalPhysicalPeople: number = 0;
  totalLegalPeople: number = 0;
  
  constructor(private service: PeopleService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loadPhysicalPeople(1, 10);
    this.loadLegalPeople(1, 10);
  }

  loadPhysicalPeople(page: number, pageSize: number) {
    this.service.getPhysicalPeople(page, pageSize)
      .subscribe((data: Paged<PhysicalPersonResponse>) => {
        this.physicalPeople = data.entities;
        this.totalPhysicalPeople = data.total;
      });
  }

  deletePhysicalPerson(id: number) {
    this.dialog.open(ConfirmActionDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    })
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.service.deletePhysicalPerson(id)
            .subscribe(() => {
              this.physicalPeople = this.physicalPeople.filter(u => u.id != id);
              this.snackBar.open('User successfully deleted!', 'Deleted', { duration: 3000 });
            });
          }
      });
  }

  loadLegalPeople(page: number, pageSize: number) {
    this.service.getLegalPeople(page, pageSize)
      .subscribe((data: Paged<LegalPersonResponse>) => {
        this.legalPeople = data.entities;
        this.totalLegalPeople = data.total;
      });
  }

  handlePhysicalPageEvent(event: PageEvent) {
    this.loadPhysicalPeople(event.pageIndex + 1, event.pageSize);
  }

  handleLegalPageEvent(event: PageEvent) {
    this.loadLegalPeople(event.pageIndex + 1, event.pageSize);
  }

  deleteLegalPerson(id: number) {
    this.dialog.open(ConfirmActionDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    })
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.service.deleteLegalPerson(id)
          .subscribe(() => {
            this.legalPeople = this.legalPeople.filter(u => u.id != id);
            this.snackBar.open('User successfully deleted!', 'Deleted', { duration: 3000 });
          });
        }
      });
  }

  getStringQualifier(qualifier: number): string {
    switch(qualifier) {
      case 1: return 'Customer';
      case 2: return 'Suplier';
      case 3: return 'Employee';
      default: return 'Unknown';
    }
  }
}
