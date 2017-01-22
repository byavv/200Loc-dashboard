import { Routes } from '@angular/router';
import { LoginComponent, ChangePasswordComponent } from './components';
import { IsNotAuthenticatedGuard, IsAuthenticatedGuard } from '../core';

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