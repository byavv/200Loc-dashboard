import { NgModule } from '@angular/core';

import { ENTRIES_DIRECTIVES } from './directives';
import { ENTRIES_CONTROLS } from './controls';
import { ENTRIES_COMPONENTS } from './components';

export var ENTRIES_DECLARATIONS = [
  ...ENTRIES_DIRECTIVES,
  ...ENTRIES_CONTROLS,
  ...ENTRIES_COMPONENTS
];

import { EntriesRoutingModule } from './entries.routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ...ENTRIES_DECLARATIONS
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
