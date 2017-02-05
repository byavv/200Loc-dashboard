import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { ServicesStatisticRoutingModule } from './services-statistic.routing.module';
import { ServicesStatisticComponent } from './services-statistic.component';

const SERVICES_STATISTIC_MODULE_DECLARATIONS = [
  ServicesStatisticComponent
];

@NgModule({
  declarations: [
    ...SERVICES_STATISTIC_MODULE_DECLARATIONS,
  ],
  imports: [
    SharedModule,
    ServicesStatisticRoutingModule
  ]
})
export class ServicesStatisticModule { }
