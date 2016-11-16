import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ValidationActions {
    static SET_VALIDITY = '[VALIDATION] SET VALIDITY';
    setValidity(validationObject: any): Action {
        return {
            type: ValidationActions.SET_VALIDITY,
            payload: validationObject
        };
    }
}