import { Component } from '@angular/core';
import { UserResponse } from 'src/app/models/responses/user.response';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: UserResponse;

  constructor(private sessionStorageService: SessionStorageService, private location: Location) {
    this.user = this.sessionStorageService.getUser()!.user;
  }

  back(): void {
    this.location.back()
  }
}
