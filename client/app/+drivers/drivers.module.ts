import { NgModule } from '@angular/core';

import { DRIVER_MNGR_COMPONENTS } from './components';
import { DriversRoutingModule } from './drivers.routing.module';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ...DRIVER_MNGR_COMPONENTS,
  ],
  imports: [
    SharedModule,
    DriversRoutingModule
  ]
})
export class DriversModule { }
