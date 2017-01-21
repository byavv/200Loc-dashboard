import { Routes } from '@angular/router';
import { LoginComponent } from './components';

export const AuthenticationRoutes: Routes = [
  {
    path: 'auth',
    component: LoginComponent
  }
];