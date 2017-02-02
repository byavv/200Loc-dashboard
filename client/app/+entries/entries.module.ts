import { NgModule } from '@angular/core';
import { PaginationModule } from 'ng2-bootstrap';

import { EntriesBaseComponent } from './entries-base';
import { ENTRIES_LIST_COMPONENTS } from './entries-list'
import { EntriesWizardBaseComponent } from './entries-wizard-base'
import { EntriesWizardStepGeneral } from './entries-wizard-step-general'
import { EntriesWizardStepPlugins } from './entries-wizard-step-plugins'
import { EntriesWizardStepPreview } from './entries-wizard-step-preview'

const ENTRIES_DECLARATIONS = [
  EntriesBaseComponent,
  EntriesWizardBaseComponent,
  EntriesWizardStepGeneral,
  EntriesWizardStepPlugins,
  EntriesWizardStepPreview,
  ...ENTRIES_LIST_COMPONENTS
];

import { EntriesRoutingModule } from './entries.routing.module';
import { EntriesSharedModule } from './shared/entries.shared.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    ...ENTRIES_DECLARATIONS
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    EntriesSharedModule,
    PaginationModule.forRoot()
  ]
})
export class EntriesModule { }
