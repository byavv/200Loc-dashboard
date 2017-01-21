import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

import {
  DriverManagerBaseComponent,
  DriverManagerConfigComponent,
  DriverTypesComponent
} from './components';

export const routes: Routes = [
  {
    path: '',
    component: DriverManagerBaseComponent,
    children: [
      {
        path: 'config',
        component: DriverManagerConfigComponent
      },
      {
        path: '',
        component: DriverTypesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule { }

