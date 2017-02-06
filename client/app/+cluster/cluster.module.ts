import { NgModule } from '@angular/core';
import { PaginationModule } from 'ng2-bootstrap';

import { ClusterBaseComponent } from './cluster-base';

const CLUSTER_DECLARATIONS = [
  ClusterBaseComponent 
];

import { ClusterRoutingModule } from './cluster.routing.module';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ...CLUSTER_DECLARATIONS
  ],
  imports: [
    SharedModule,   
    ClusterRoutingModule   
  ]
})
export class ClusterModule { }
