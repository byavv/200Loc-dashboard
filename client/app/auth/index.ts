import { LoginComponent } from './login/login.component';
export * from './login/login.component';

import { ChangePasswordComponent } from './auth-password-change/auth-password-change.component';
export * from './changePassword/changePsw.component';

export var AUTHENTICATION_COMPONENTS = [
    LoginComponent,
    ChangePasswordComponent
]