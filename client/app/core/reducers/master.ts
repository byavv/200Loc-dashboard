/* tslint:disable */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { MasterState, Config } from '../models';
import { MasterActions } from '../actions';

export interface EntryCreationMasterState {
    config: Config;
    loaded: boolean;
};

const initialState: EntryCreationMasterState = {
    config: {},
    loaded: false
};

export function masterReducer(state = initialState, action: Action): EntryCreationMasterState {
    switch (action.type) {
        case MasterActions.SET_CONFIG: {
            const data = action.payload;
            const newState = Object.assign({}, {
                config: new Config(data),
                loaded: true
            })
            return newState;
        }
        case MasterActions.SET_GENERAL_DATA: {
            const generalData = action.payload;
            const newConfig = Object.assign({}, state.config, generalData)
            const newState = Object.assign({}, state, {
                config: newConfig
            });
            return newState;
        }
        case MasterActions.SET_PLUGINS_DATA: {
            const plugins: any[] = [...action.payload];
            const newConfig = Object.assign({}, state.config, { plugins: plugins })
            const newState = Object.assign({}, state, {
                config: newConfig
            });
            return newState;
        }
        default: {
            return state;
        }
    }
}

export function getConfig() {
    return (state$: Observable<EntryCreationMasterState>) => state$
        .select(state => state.config);
}

export function getConfigPlugins() {
    return (state$: Observable<EntryCreationMasterState>) => state$
        .select(state => state.config)
        .select(config => config.plugins);
}

