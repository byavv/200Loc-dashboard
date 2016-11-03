import { NgModule, ApplicationRef, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';
import { App } from './app.component';
import { API_MNGR_COMPONENTS } from './api-manager';
import { DRIVER_MNGR_COMPONENTS } from './driver-manager';
import { PLUGINS_COMPONENTS } from './plugin-manager';
import { AUTHENTICATION_COMPONENTS } from './authentication';
import { APP_CORE_API_PROVIDERS } from './core'

import { SharedModule } from "./shared";

// Redux
import { StoreModule, Store } from '@ngrx/store';
import reducer from './core/reducers';
import { AppState } from './core/reducers';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

enableProdMode();

@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    ...API_MNGR_COMPONENTS,
    ...DRIVER_MNGR_COMPONENTS,
    ...PLUGINS_COMPONENTS,
    ...AUTHENTICATION_COMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: false }),
    SharedModule,
    StoreModule.provideStore(reducer)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ...APP_CORE_API_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
}
