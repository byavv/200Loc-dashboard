import { NgModule } from '@angular/core';
import { PaginationModule } from 'ng2-bootstrap';

import { RestoreBaseComponent } from './restore-base';

const RESTORE_DECLARATIONS = [
  RestoreBaseComponent 
];

import { RestoreRoutingModule } from './restore.routing.module';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ...RESTORE_DECLARATIONS
  ],
  imports: [
    SharedModule,   
    RestoreRoutingModule   
  ]
})
export class RestoreModule { }
