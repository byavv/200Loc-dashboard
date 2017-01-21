import { InertLink } from './inertLink';
import { AceEditorDirective } from './aceEditorDirective';
import { OffClickDirective } from './offClick.directive';
import { RestSize } from './restSize';
import { ShowError } from './showError';

export * from './aceEditorDirective';
export * from './inertLink';
export * from './restSize';
export * from './showError';

export var SHARED_DIRECTIVES = [
    InertLink, AceEditorDirective, OffClickDirective, RestSize, ShowError
];
