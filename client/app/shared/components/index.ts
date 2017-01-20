import { LoaderComponent } from './loader/loader';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { AceEditorComponent } from './ace-editor/aceEditorComponent';
import { POPOVER_DIRECTIVES } from './popover';
import { SwitchComponent } from './switch';

export * from './loader/loader';
export * from './header/header';
export * from './footer/footer';
export * from './ace-editor/aceEditorComponent';
export * from './switch';

export var SHARED_COMPONENTS = [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    AceEditorComponent,
    SwitchComponent,
    ...POPOVER_DIRECTIVES
]
