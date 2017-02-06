import { ClusterBaseComponent } from './cluster-base';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: ClusterBaseComponent,
    canActivate: [IsAuthenticatedGuard]   
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClusterRoutingModule { }
