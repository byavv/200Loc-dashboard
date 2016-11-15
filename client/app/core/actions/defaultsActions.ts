import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class DefaultsActions {

    static SET_PLUGINS_LIST = '[DEFAULTS] SET PLUGINS';
    static SET_DRIVERS_LIST = '[DEFAULTS] SET DRIVERS';

    setPlugins(plugins: any): Action {
        return {
            type: DefaultsActions.SET_PLUGINS_LIST,
            payload: plugins
        };
    }

    setDrivers(drivers: Array<any>): Action {
        return {
            type: DefaultsActions.SET_DRIVERS_LIST,
            payload: drivers
        };
    }
}