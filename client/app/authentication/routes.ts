import { Routes } from '@angular/router';
import { LoginComponent, SignUpComponent, ChangePasswordComponent } from './components';

export const AuthenticationRoutes: Routes = [
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'auth/s',
    component: SignUpComponent
  },
  {
    path: 'auth/change',
    component: ChangePasswordComponent
  }
];