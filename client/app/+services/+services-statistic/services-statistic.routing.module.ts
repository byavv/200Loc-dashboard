import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../../core';

import { ServicesStatisticComponent } from './services-statistic.component';

export const routes: Routes = [
  {
    path: '',
    component: ServicesStatisticComponent,
    canActivate: [IsAuthenticatedGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesStatisticRoutingModule { }

