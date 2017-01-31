import { Routes } from '@angular/router';

import { IsNotAuthenticatedGuard, IsAuthenticatedGuard } from '../core';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './auth-password-change/auth-password-change.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'auth/change',
    component: ChangePasswordComponent,
    canActivate: [IsAuthenticatedGuard],
  }
];