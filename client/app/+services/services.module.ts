import { NgModule } from '@angular/core';

import { ServicesTypesListComponent } from './services-list-types';
import { ServicesConfigListComponent } from './services-list-config';
import { ServicesBaseComponent } from './services-base';
import { ServicesRoutingModule } from './services.routing.module';

import { SharedModule } from '../shared';

const SERVICES_MODULE_DECLARATIONS = [
  ServicesTypesListComponent,
  ServicesConfigListComponent,
  ServicesBaseComponent
];

@NgModule({
  declarations: [
    ...SERVICES_MODULE_DECLARATIONS,
  ],
  imports: [
    SharedModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
