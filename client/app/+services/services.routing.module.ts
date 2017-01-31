import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

import { ServicesTypesListComponent } from './services-list-types';
import { ServicesConfigListComponent } from './services-list-config';
import { ServicesBaseComponent } from './services-base';

export const routes: Routes = [
  {
    path: '',
    component: ServicesBaseComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'config',
        component: ServicesConfigListComponent
      },
      {
        path: '',
        component: ServicesTypesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule { }

