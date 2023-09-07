import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'home-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private sessionStorageService: SessionStorageService) { }
  
  ngOnInit(): void {
    this.isAdmin = this.sessionStorageService.isAdmin();
  }

}
