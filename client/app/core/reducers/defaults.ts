import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { MasterState, Plugin } from '../models';
import { DefaultsActions } from '../actions';

export interface DefaultAppState {
    plugins: Array<Plugin>;
    drivers: Array<any>;
    loaded: boolean;
};

const initialState: DefaultAppState = {
    plugins: [],
    drivers: [],
    loaded: false
};

export function defaultsReducer(state = initialState, action: Action): DefaultAppState {
    switch (action.type) {
        case DefaultsActions.SET_PLUGINS_LIST: {
            const plugins = [...action.payload];
            const newState = Object.assign({}, state, {
                plugins: plugins
            })
            return newState;
        }
        case DefaultsActions.SET_DRIVERS_LIST: {
            const drivers: any[] = [...action.payload];
            const newState = Object.assign({}, state, {
                plugins: drivers
            })
            return newState;
        }
        case DefaultsActions.SET_DEFAULTS: {
            const defaults: any = action.payload;
            const newState = Object.assign({}, state, defaults)
            return newState;
        }
        default: {
            return state;
        }
    }
}

export function getPlugins() {
    return (state$: Observable<DefaultAppState>) => state$
        .select((state) => state.plugins);
}

export function getDrivers() {
    return (state$: Observable<DefaultAppState>) => state$
        .pluck('validity');
}
