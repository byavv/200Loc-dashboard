import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ModalModule, DropdownModule, TabsModule } from 'ng2-bootstrap'
import { SHARED_SERVICES } from './services';
import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from "./directives";
import { APP_PIPES_PIPES } from "./pipes";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    ...APP_PIPES_PIPES
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    ModalModule.forRoot(),
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    DropdownModule,
    TabsModule,
    ...APP_PIPES_PIPES,
    NgbModule
  ],
  providers: [
    ...SHARED_SERVICES
  ]
})
export class SharedModule {

}
