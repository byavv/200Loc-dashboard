import { InertLink } from './inertLink';
import { AceEditorDirective } from './aceEditorDirective';
import { OffClickDirective } from './offClick.directive';

export * from './aceEditorDirective';
export * from './inertLink';

export var SHARED_DIRECTIVES = [
    InertLink, AceEditorDirective, OffClickDirective
];
