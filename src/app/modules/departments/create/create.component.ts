import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalPersonResponse } from '../../people/responses/physical-person.response';
import { DepartmentForPhysicalPersonRequest } from '../requests/department-for-physical-person.request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { PeopleService } from '../../people/services/people.service';
import { LegalPersonResponse } from '../../people/responses/legal-person.response';
import { DepartmentForLegalPersonRequest } from '../requests/department-for-legal-person.request';

@Component({
  selector: 'home-department-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class DepartmentCreateComponent implements OnInit {
  
  createPhysicalPersonDepartmentForm: FormGroup = new FormGroup({});
  createLegalPersonDepartmentForm: FormGroup = new FormGroup({});
  availablePhysicalPeople: PhysicalPersonResponse[] = [];
  availableLegalPeople: LegalPersonResponse[] = [];

  constructor(private fb: FormBuilder,
    private service: DepartmentService,
    private peopleService: PeopleService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.createPhysicalPersonDepartmentForm = this.fb.group({
      name: ['', Validators.required],
      responsibleId: ['', Validators.required],
    });

    this.createLegalPersonDepartmentForm = this.fb.group({
      name: ['', Validators.required],
      responsibleId: ['', Validators.required],
    });

    this.loadPhysicalPeople();
    this.loadLegalPeople();
  }

  loadPhysicalPeople() {
    this.peopleService.getPhysicalPeopleForDepartments()
      .subscribe((data: PhysicalPersonResponse[]) => {
        this.availablePhysicalPeople = data;
      });
  }

  loadLegalPeople() {
    this.peopleService.getLegalPeopleForDepartments()
      .subscribe((data: LegalPersonResponse[]) => {
        this.availableLegalPeople = data;
      });
  }

  createPhysicalPersonDepartment() {
    if(!this.createPhysicalPersonDepartmentForm.valid) {
      this.snackBar.open('Fields are required', 'Ok', { duration: 3000 });
      return;
    }

    const form = this.createPhysicalPersonDepartmentForm.value;
    const physicalRequest: DepartmentForPhysicalPersonRequest = { id: undefined, name: form.name, physicalPersonId: form.responsibleId };

    this.service.createDepartmentForPhysicalPerson(physicalRequest)
      .subscribe({
        next: () => {
          this.snackBar.open('Department created successfully', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/departments']);
        }
      });
  }
  
  createLegalPersonDepartment() {
    if(!this.createLegalPersonDepartmentForm.valid) {
      this.snackBar.open('Fields are required', 'Ok', { duration: 3000 });
      return;
    }

    const form = this.createLegalPersonDepartmentForm.value;
    const legalRequest: DepartmentForLegalPersonRequest = { id: undefined, name: form.name, legalPersonId: form.responsibleId };

    this.service.createDepartmentForLegalPerson(legalRequest)
      .subscribe({
        next: () => {
          this.snackBar.open('Department created successfully', 'Ok', { duration: 3000 });
          this.router.navigate(['/home/departments']);
        }
      });
  }
}
