import { GroupsBaseComponent } from './groups-base';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';

export const routes: Routes = [
  {
    path: '',
    component: GroupsBaseComponent,
    canActivate: [IsAuthenticatedGuard]   
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule { }
