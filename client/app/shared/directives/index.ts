import { InertLink } from './inertLink';
import { AceEditorDirective } from './aceEditorDirective';
import { OffClickDirective } from './offClick.directive';
import { RestSize } from './restSize';
import { ShowValidationError } from './showError';
import { EqualValidator } from './validateEqual';
import { HideForNotLoggedDirective } from './hiddenNotLoggedIn.directive';

export * from './aceEditorDirective';
export * from './inertLink';
export * from './restSize';
export * from './showError';

export var SHARED_DIRECTIVES = [
    InertLink, AceEditorDirective,
    OffClickDirective, RestSize,
    ShowValidationError, EqualValidator,
    HideForNotLoggedDirective
];
