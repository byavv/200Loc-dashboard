import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class MasterActions {

    static SET_GENERAL = '[MASTER] SET GENERAL';
    static SET_PLUGINS = '[MASTER] SET PLUGINS';

    setGeneralEntryInfo(generalFormData: any): Action {
        return {
            type: MasterActions.SET_GENERAL,
            payload: generalFormData
        };
    }

    setEntryPlugins(plugins: any): Action {
        return {
            type: MasterActions.SET_PLUGINS,
            payload: plugins
        };
    }
}