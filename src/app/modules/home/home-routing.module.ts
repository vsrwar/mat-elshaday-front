import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { UserComponent } from '../users/user.component';
import { UserCreateComponent } from '../users/create/create.component';
import { UserEditComponent } from '../users/edit/edit.component';
import { DepartmentsComponent } from '../departments/departments.component';
import { PeopleComponent } from '../people/people.component';
import { PersonCreateComponent } from '../people/create/create.component';
import { PersonEditComponent } from '../people/edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', redirectTo:'dashboard', pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent },

    { path: 'users', component: UserComponent },
    { path: 'users/create', component: UserCreateComponent },
    { path: 'users/edit/:id', component: UserEditComponent },

    { path: 'departments', component: DepartmentsComponent },

    { path: 'people', component: PeopleComponent },
    { path: 'people/create', component: PersonCreateComponent },
    { path: 'people/edit/:type/:id', component: PersonEditComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
