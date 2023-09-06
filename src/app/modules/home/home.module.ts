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

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AsideMenuComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class HomeModule { }
