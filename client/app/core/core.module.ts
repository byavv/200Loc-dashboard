import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/**
 * Cyza specific router guards
 */
import { GUARDS } from "./guards";
import { APP_ACTIONS } from "./actions";

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CORE_SERVICES } from './services';

@NgModule({
    imports: [CommonModule, HttpModule, RouterModule],
    declarations: [],
    exports: [],
    providers: []
})
/**
 * Core module. Contains all singleton services to work with backend api,
 * Authorization, Logging and Error handling
 * WARNING: Avoid importing it anywhere except in the Main module.
 */
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ...CORE_SERVICES,
                ...APP_ACTIONS,
                ...GUARDS
            ]
        };
    }
}