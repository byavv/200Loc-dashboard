import { ApiManagementComponent, ApiListComponent, ApiMasterComponent } from './components';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: ApiManagementComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'master',
        component: ApiMasterComponent
      },
      {
        path: '',
        component: ApiListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule { }

