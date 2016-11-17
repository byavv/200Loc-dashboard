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

/**
 * Get current master configuration as form value and 
 */
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
/**
 * Get state of current entry config being edited in master (may be newly created of taken from the backend)
 * This config goes as initial value for entry configuration master
 */
export function getConfigState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.config)
    };
}

/**
 * Get all available plugins installed in system
 */
export function getPlugins() {
    return compose(defaults.getAvailablePlugins(), getDefaultsState());
}
/**
 * Get all available drivers installed in system
 */
export function getDrivers() {
    return compose(defaults.getAvailableDrivers(), getDefaultsState());
}


export function getMasterConfigPlugins() {
    return compose(master.getMasterPlugins(), getMasterState());

}

