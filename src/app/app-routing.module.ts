import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'change-password/:nickname', component: ChangePasswordComponent },
  {
    path: 'home',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },

  { path: '**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
