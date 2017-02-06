import { RestoreBaseComponent } from './restore-base';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: RestoreBaseComponent,
    canActivate: [IsAuthenticatedGuard]   
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoreRoutingModule { }
