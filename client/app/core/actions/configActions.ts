import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ConfigActions {
    static SET_CONFIG = '[CONFIG] SET CONFIG';

    setConfig(config: any): Action {
        return {
            type: ConfigActions.SET_CONFIG,
            payload: config
        };
    }
}