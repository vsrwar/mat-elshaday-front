import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CardComponent } from './card/card.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../pages/layout/header/header.component';
import { FooterComponent } from '../pages/layout/footer/footer.component';
import { AsideMenuComponent } from '../pages/layout/aside-menu/aside-menu.component';
import { UserComponent } from '../users/user.component';
import { UserCreateComponent } from '../users/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmActionDialogComponent } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { UserEditComponent } from '../users/edit/edit.component';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AsideMenuComponent,
    UserComponent,
    UserCreateComponent,
    UserEditComponent,

    ConfirmActionDialogComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class HomeModule { }
