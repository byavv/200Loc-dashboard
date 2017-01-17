import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ModalModule, DropdownModule, TabsModule } from 'ng2-bootstrap'
import { SHARED_SERVICES } from './services';
import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from "./directives";


@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    ModalModule.forRoot(),
    DropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,    
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    DropdownModule,
    TabsModule
  ],
  providers: [
    ...SHARED_SERVICES
  ]
})
export class SharedModule {

}
