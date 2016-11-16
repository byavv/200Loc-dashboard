/* tslint:disable */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { ValidationActions } from '../actions';

export interface EntryValidityState {
    general?: true
    plugins?: true
};

const initialState: EntryValidityState = {
    general: true,
    plugins: true
};

export function masterValidityReducer(state = initialState, action: Action): EntryValidityState {
    switch (action.type) {

        case ValidationActions.SET_VALIDITY: {
            const newState = Object.assign({}, state, action.payload)
            return newState;
        }
        default: {
            return state;
        }
    }
}


export function getValidity() {
    return (state$: Observable<EntryValidityState>) => state$
        .select(state => state);
}
