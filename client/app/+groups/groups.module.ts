import { NgModule } from '@angular/core';
import { PaginationModule } from 'ng2-bootstrap';

import { GroupsBaseComponent } from './groups-base';

const GROUPS_DECLARATIONS = [
  GroupsBaseComponent 
];

import { GroupsRoutingModule } from './groups.routing.module';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ...GROUPS_DECLARATIONS
  ],
  imports: [
    SharedModule,   
    GroupsRoutingModule   
  ]
})
export class GroupsModule { }
