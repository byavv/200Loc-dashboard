import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { AUTHENTICATION_COMPONENTS } from './authentication/components';
import { CoreModule } from './core';
import { AppRoutingModule } from './app.routing.module';

import { SharedModule } from "./shared";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Redux
import { StoreModule } from '@ngrx/store';
import reducer from './core/reducers';

import 'brace';
import 'brace/theme/eclipse'
import 'brace/mode/json'

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, 
    ...AUTHENTICATION_COMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpModule,   
    SharedModule,
    NgbModule.forRoot(),
    StoreModule.provideStore(reducer),
    CoreModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
}
