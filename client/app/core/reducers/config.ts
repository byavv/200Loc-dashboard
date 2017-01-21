/* tslint:disable */
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Config } from '../models';
import { ConfigActions } from '../actions';

export interface ConfigState extends Config { };
const initialState: ConfigState = new Config();

export function configReducer(state = initialState, action: Action): ConfigState {
    switch (action.type) {
        case ConfigActions.SET_CONFIG: {
            const newState = new Config(action.payload);
            return newState;
        }
        default: {
            return state;
        }
    }
}

export function getConfig() {
    return (state$: Observable<ConfigState>) => state$
        .select(state => state);
}


