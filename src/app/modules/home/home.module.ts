import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

import { HeaderComponent } from '../pages/layout/header/header.component';
import { FooterComponent } from '../pages/layout/footer/footer.component';
import { AsideMenuComponent } from '../pages/layout/aside-menu/aside-menu.component';

import { CardComponent } from './card/card.component';

import { ConfirmActionDialogComponent } from 'src/app/dialogs/confirm-action-dialog/confirm-action-dialog.component';

import { DashboardComponent } from '../dashboard/dashboard.component';

import { UserComponent } from '../users/user.component';
import { UserCreateComponent } from '../users/create/create.component';
import { UserEditComponent } from '../users/edit/edit.component';

import { DepartmentsComponent } from '../departments/departments.component';
import { DepartmentCreateComponent } from '../departments/create/create.component';

import { PeopleComponent } from '../people/people.component';
import { PersonCreateComponent } from '../people/create/create.component';
import { PersonEditComponent } from '../people/edit/edit.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';

import { DocumentPipe } from 'src/app/pipes/document.pipe';

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

    DepartmentsComponent,
    DepartmentCreateComponent,

    PeopleComponent,
    PersonCreateComponent,
    PersonEditComponent,

    ConfirmActionDialogComponent,
    
    DocumentPipe
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    
    NgxMaskDirective,
    NgxMaskPipe,
    
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
    MatPaginatorModule,
    MatTabsModule
  ],
  providers: [provideEnvironmentNgxMask(), provideNgxMask()],
})
export class HomeModule { }
