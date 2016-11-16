import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import * as master from './master';
import * as defaults from './defaults';
import * as validation from './masterValidation';
import * as config from './config';

import { masterReducer, EntryCreationMasterState } from './master';
import { defaultsReducer, DefaultAppState } from './defaults';
import { EntryValidityState, masterValidityReducer } from './masterValidation';
import { ConfigState, configReducer } from './config';

import { MasterState } from '../models';

export interface AppState {
    master: EntryCreationMasterState;
    defaults: DefaultAppState;
    validation: ValidityState;
    config: ConfigState
}

export default combineReducers({
    master: masterReducer,
    defaults: defaultsReducer,
    validation: masterValidityReducer,
    config: configReducer
});

export function getMasterState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.master)
    };
}
export function getDefaultsState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.defaults)
    };
}

export function getValidationState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.validation)
    };
}

export function getConfigState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.config)
    };
}


export function getPlugins() {
    return compose(defaults.getPlugins(), getDefaultsState());
}

export function getDrivers() {
    return compose(defaults.getDrivers(), getDefaultsState());
}

export function getMasterConfig() {
    return compose(master.getConfig(), getMasterState());
}

export function getMasterConfigPlugins() {
    return compose(master.getConfigPlugins(), getMasterState());

}

