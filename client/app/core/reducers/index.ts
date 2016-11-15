import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import * as master from './master';
import * as defaults from './defaults';

import { masterReducer, EntryCreationMasterState } from './master';
import { defaultsReducer, DefaultAppState } from './defaults';

import { MasterState } from '../models';

export interface AppState {
    master: EntryCreationMasterState;
    defaults: DefaultAppState
}

export default combineReducers({
    master: masterReducer,
    defaults: defaultsReducer
});

export function getMasterState() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.master)
    };
}
export function getDefaults() {
    return (state$: Observable<AppState>) => {
        return state$
            .select(s => s.defaults)
    };
}

export function getPlugins() {
    return compose(defaults.getPlugins(), getDefaults());
}

export function getDrivers() {
    return compose(defaults.getDrivers(), getDefaults());
}

export function getEntryData() {
    return compose(master.getMasterValue(), getMasterState());
}
