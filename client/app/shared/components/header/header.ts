import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth, UserApi, UserActions, AppState, getAuthenticationState } from '../../../core'
import { Store } from '@ngrx/store';

@Component({
    selector: 'loc-header',
    templateUrl: './header.html'
})
export class HeaderComponent implements OnInit {
    isAuthenticated: boolean = false;
    shouldRedirect: boolean;
    username: string;
    active: boolean = false;

    constructor(
        private router: Router,
        private userApi: UserApi,
        private _userActions: UserActions,
        private _store: Store<AppState>,
        private _authService: LoopBackAuth) {
        this.closeSidebarHandler = this.closeSidebarHandler.bind(this);
    }

    ngOnInit() {
        this._store.let(getAuthenticationState()).subscribe(state => {
            this.isAuthenticated = state.authenticated;
            this.username = state.user ? state.user.username : "";
        });
    }
    signOut() {
        this.userApi.logout()
            .finally(() => {
                this._store.dispatch(this._userActions.logout());
                this._authService.clearStorage();
                this.router.navigate(['auth'])
            })
            .subscribe(() => { })
    }

    closeSidebarHandler() {
        this.active = false;
    }
}
