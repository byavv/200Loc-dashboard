import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class MasterActions {

    static SET_GENERAL_DATA = '[MASTER] SET ENTRY DATA';
    static SET_PLUGINS_DATA = '[MASTER] SET PLUGINS DATA';
    static SET_CONFIG = '[MASTER] SET CONFIG';

    setConfig(config: any): Action {
        return {
            type: MasterActions.SET_CONFIG,
            payload: config
        };
    }
    setGeneralInfoData(info: any): Action {
        return {
            type: MasterActions.SET_GENERAL_DATA,
            payload: info
        };
    }
    setPluginsData(plugins: Array<any>): Action {
        return {
            type: MasterActions.SET_PLUGINS_DATA,
            payload: plugins
        };
    }    
}