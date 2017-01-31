import { EntriesWizardBaseComponent } from './entries-wizard-base';
import { EntriesListComponent } from './entries-list';
import { EntriesBaseComponent } from './entries-base';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: EntriesBaseComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'master',
        component: EntriesWizardBaseComponent
      },
      {
        path: '',
        component: EntriesListComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule { }

