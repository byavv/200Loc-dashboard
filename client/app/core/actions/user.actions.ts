import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

/**
 * User authentication actions
 */
@Injectable()
export class UserActions {

    static SET_USER = '[USER] SET USER';
    /**
     * We call this after getting server responce with user data after login operation 
     * to apply users login data to application's auth system
     */
    login(userdata: any): Action {
        return {
            type: UserActions.SET_USER,
            payload: userdata
        }
    }

    /**
     * We call this after getting server responce with user data after login operation 
     * to apply users login data to application's auth system
     */
    logout(): Action {
        return {
            type: UserActions.SET_USER,
            payload: null
        }
    }
}