import { Component, Input } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() nickname: string = "";
  
  constructor(private sessionStorageService: SessionStorageService) { }

  logout(): void {
    this.sessionStorageService.logout();
  }
}
