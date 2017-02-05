import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared'

import { ENTRIES_COMPONENTS } from './components';
import { ENTRIES_DIRECTIVES } from "./directives";
import { ENTRIES_PIPES } from "./pipes";
import { ENTRIES_PROVIDERS } from './providers';

let DECLARATIONS = [
    ...ENTRIES_COMPONENTS,
    ...ENTRIES_DIRECTIVES,
    ...ENTRIES_PIPES
]

@NgModule({
    declarations: DECLARATIONS,
    imports: [
        SharedModule
    ],
    providers: [
        ...ENTRIES_PROVIDERS
    ],
    exports: DECLARATIONS
})
export class EntriesSharedModule { }
