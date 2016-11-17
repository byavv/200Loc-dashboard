/* tslint:disable */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { MasterState, Config } from '../models';
import { MasterActions } from '../actions';

export interface EntryCreationMasterState extends Config {
    loaded: boolean;
};

const initialState: EntryCreationMasterState = {
    loaded: false
};

export function masterReducer(state = initialState, action: Action): EntryCreationMasterState {
    switch (action.type) {
        case MasterActions.SET_CONFIG: {
            const data = action.payload;
            const newState = Object.assign({}, new Config(data), {
                loaded: true
            })
            return newState;
        }
        case MasterActions.SET_GENERAL_DATA: {
            const generalData = action.payload;
            return Object.assign({}, state, generalData);
        }
        case MasterActions.SET_PLUGINS_DATA: {
            const plugins: any[] = [...action.payload];
            const newState = Object.assign({}, state, { plugins: plugins });
            return newState;
        }
        default: {
            return state;
        }
    }
}

export function getMasterPlugins() {
    return (state$: Observable<EntryCreationMasterState>) => state$
        .select(state => state.plugins)
}

