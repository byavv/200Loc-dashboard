import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Plugin, Driver } from '../models';
import { DefaultsActions } from '../actions';

export interface DefaultAppState {
    plugins: Array<Plugin>;
    drivers: Array<Driver>;
    loaded: boolean;
    loading: boolean;
};

const initialState: DefaultAppState = {
    plugins: [],
    drivers: [],
    loaded: false,
    loading: false
};

export function defaultsReducer(state = initialState, action: Action): DefaultAppState {
    switch (action.type) {
        case DefaultsActions.SET_PLUGINS_LIST: {
            const plugins = [...action.payload];
            const newState = Object.assign({}, state, {
                plugins: plugins,
                loaded: true,
                loading: false
            })
            return newState;
        }
        case DefaultsActions.SET_DRIVERS_LIST: {
            const drivers: any[] = [...action.payload];
            const newState = Object.assign({}, state, {
                drivers: drivers,
                loaded: true,
                loading: false
            })
            return newState;
        }
        case DefaultsActions.SET_DEFAULTS: {
            const defaults: any = action.payload;
            const newState = Object.assign({}, state, {
                loaded: true,
                loading: false
            }, defaults)
            return newState;
        }
        case DefaultsActions.SET_LOADING: {
            const defaults: any = action.payload;
            const newState = Object.assign({}, state, { loading: true })
            return newState;
        }
        default: {
            return state;
        }
    }
}

export function getAvailablePlugins() {
    return (state$: Observable<DefaultAppState>) => state$
        .select((state) => state.plugins);
}

export function getAvailableDrivers() {
    return (state$: Observable<DefaultAppState>) => state$
        .select((state) => state.drivers);
}

export function isLoading() {
    return (state$: Observable<DefaultAppState>) => state$
        .select((state) => state.loading);
}

export function isLoaded() {
    return (state$: Observable<DefaultAppState>) => state$
        .select((state) => state.loaded);
}

// export function getAvailableDrivers() {
//     return (state$: Observable<DefaultAppState>) => state$
//         .pluck('validity');
// }
