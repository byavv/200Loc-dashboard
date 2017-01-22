import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, isUserLoggedIn } from '../reducers';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
    constructor(private _store: Store<AppState>, private _router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._store
            .let(isUserLoggedIn())
            .map((value) => {
                if (value) this._router.navigate(['/']);
                return !value;
            });
    }
}