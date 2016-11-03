/* tslint:disable */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { MasterState } from '../models';
import { MasterActions } from '../actions';

export interface EntryCreationMasterState {
    general: any;
    plugins: any;
    position: string;
    errors: Array<any>;
};

const initialState: EntryCreationMasterState = {
    general: {},
    plugins: [],
    position: 'general',
    errors: []
};

export function masterReducer(state = initialState, action: Action): EntryCreationMasterState {
    switch (action.type) {
        case MasterActions.SET_GENERAL: {
            const generalFormData = action.payload;
            const newState = Object.assign({}, state, {
                general: generalFormData
            })
            return newState;
        }
        case MasterActions.SET_PLUGINS: {
            const plugins: any[] = [...action.payload];
            const newState = Object.assign({}, state, {
                plugins: plugins
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
