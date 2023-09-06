import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/services.service';

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

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getTotalLegalPeople().subscribe((data) => this.countLegalPeople = data);
    this.service.getTotalPhysicalPeople().subscribe((data) => this.countPhysicalPeople = data);
    this.service.getTotalDepartments().subscribe((data) => this.countDepartments = data);
    this.service.getTotalUsers().subscribe((data) => this.countUsers = data);
  }

}
