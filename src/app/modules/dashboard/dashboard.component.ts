import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/services.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  countLegalPeople: number = 0;
  countPhysicalPeople: number = 0;
  countDepartments: number = 0;
  countUsers: number = 0;
  isAdmin: boolean = false;

  constructor(private service: DashboardService,
    private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.isAdmin = this.sessionStorageService.isAdmin();

    this.service.getTotalLegalPeople().subscribe((data) => this.countLegalPeople = data);
    this.service.getTotalPhysicalPeople().subscribe((data) => this.countPhysicalPeople = data);
    this.service.getTotalDepartments().subscribe((data) => this.countDepartments = data);
    if(this.isAdmin){
      this.service.getTotalUsers().subscribe((data) => this.countUsers = data);
    }
  }

}
