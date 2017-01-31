import { NgModule } from '@angular/core';

import { EntriesBaseComponent } from './entries-base';
import { EntriesListComponent } from './entries-list'
import { EntriesWizardBaseComponent } from './entries-wizard-base'
import { EntriesWizardStepGeneral } from './entries-wizard-step-general'
import { EntriesWizardStepPlugins } from './entries-wizard-step-plugins'
import { EntriesWizardStepPreview } from './entries-wizard-step-preview'

const ENTRIES_DECLARATIONS = [
  EntriesBaseComponent,
  EntriesListComponent,
  EntriesWizardBaseComponent,
  EntriesWizardStepGeneral,
  EntriesWizardStepPlugins,
  EntriesWizardStepPreview
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
    EntriesSharedModule
  ]
})
export class EntriesModule { }
