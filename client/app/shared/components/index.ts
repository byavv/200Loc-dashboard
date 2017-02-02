import { LoaderComponent } from './loader/loader';
import { HEADER_COMPONENTS } from './header';
import { FooterComponent } from './footer/footer';
import { AceEditorComponent } from './ace-editor/aceEditorComponent';
import { POPOVER_DIRECTIVES } from './popover';
import { SwitchComponent } from './switch';
import { DynamicForm } from './dynamic-form';
import { SIDEBAR_COMPONENTS } from './sidebar';

export * from './loader/loader';
export * from './header';
export * from './footer/footer';
export * from './ace-editor/aceEditorComponent';
export * from './switch';
export * from './dynamic-form';

export var SHARED_COMPONENTS = [
    LoaderComponent,
    FooterComponent,
    AceEditorComponent,
    SwitchComponent,
    DynamicForm,
    ...POPOVER_DIRECTIVES,
    ...SIDEBAR_COMPONENTS,
    ...HEADER_COMPONENTS,
]
