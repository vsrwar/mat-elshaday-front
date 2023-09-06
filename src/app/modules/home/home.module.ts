import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CardComponent } from './card/card.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    
    MatCardModule,
    MatIconModule
  ]
})
export class HomeModule { }
