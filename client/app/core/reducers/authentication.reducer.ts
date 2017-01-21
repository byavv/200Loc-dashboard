/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../models';
import { UserActions } from '../actions';

export interface UserAuthenticationState {
    user: User;
    authenticated: boolean;
    loaded: boolean;
};

const initialState: UserAuthenticationState = {
    user: undefined,
    authenticated: false,
    loaded: false
};

export function authenticationReducer(state = initialState, action: Action): UserAuthenticationState {
    switch (action.type) {
        case UserActions.SET_USER: {
            return action.payload
                ? Object.assign({}, state, {
                    user: action.payload,
                    authenticated: true
                })
                : Object.assign({}, state, {
                    user: undefined,
                    authenticated: false
                });
        }
        default: {
            return state;
        }
    }
}

export function getAuthenticated() {
    return (state$: Observable<UserAuthenticationState>) => state$
        .select((state) => state.authenticated);
}

export function getUserInfo() {
    return (state$: Observable<UserAuthenticationState>) => state$
        .select((state) => state.user);
}