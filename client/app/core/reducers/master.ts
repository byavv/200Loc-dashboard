/* tslint:disable */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { MasterState } from '../models';
import { MasterActions } from '../actions';

export interface EntryCreationMasterState {
    general: any;
    plugins: any;
    validity: any;
};

const initialState: EntryCreationMasterState = {
    general: {},
    plugins: [],
    validity: {
        general: true,
        plugins: true
    }
};

export function masterReducer(state = initialState, action: Action): EntryCreationMasterState {
    switch (action.type) {
        case MasterActions.SET_GENERAL_DATA: {
            const generalData = action.payload;
            const newState = Object.assign({}, state, {
                general: generalData
            })
            return newState;
        }
        case MasterActions.SET_PLUGINS_DATA: {
            const plugins: any[] = [...action.payload];
            const newState = Object.assign({}, state, {
                plugins: plugins
            })
            return newState;
        }
        case MasterActions.SET_VALIDITY: {
            const validityObject: any = action.payload;
            const newState = Object.assign({}, state, {
                validity: Object.assign(state.validity, validityObject)
            })
            return newState;
        }
        default: {
            return state;
        }
    }
}

export function getMasterValue() {
    return (state$: Observable<MasterState>) => state$
        .map(s => {
            return {
                general: s.general,
                plugins: s.plugins
            }
        });
}

export function getValidity() {
    return (state$: Observable<MasterState>) => state$
        .pluck('validity');
}
