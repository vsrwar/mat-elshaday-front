import { Component } from '@angular/core';
import { UserResponse } from 'src/app/models/user.response';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: UserResponse;

  constructor(private sessionStorageService: SessionStorageService) {
    this.user = this.sessionStorageService.getUser()!.user;
  }
}
