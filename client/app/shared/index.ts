import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ModalModule, DropdownModule, TabsModule } from 'ng2-bootstrap'
import { SHARED_SERVICES } from './services';
import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from "./directives";
import { AceEditorDirective } from 'ng2-ace-editor';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    AceEditorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    ModalModule,
    DropdownModule,
    TabsModule
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    AceEditorDirective,
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
