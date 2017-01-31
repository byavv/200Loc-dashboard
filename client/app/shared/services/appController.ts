import { Injectable, NgZone, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReplaySubject, Observable } from "rxjs";

import { Store } from '@ngrx/store';
import { AppState, isUserLoggedIn } from '../../core/reducers';
import { DefaultsActions } from '../../core/actions';
import { PluginApi, ServiceApi, LoopBackAuth } from '../../core/services';

@Injectable()
export class AppController {
    private _init$: ReplaySubject<any> = new ReplaySubject();
    constructor(
        private _store: Store<AppState>,
        private _defaultsActions: DefaultsActions,
        private _pluginsApi: PluginApi,
        private _authService: LoopBackAuth,
        private _servicesApi: ServiceApi,
        private _ngZone: NgZone) { }

    get init$() {
        return this._init$.asObservable().share();
    }
    /**
     * Application start point, kicks authentication service and loads default data from server
     */
    start() {
        this._store
            .let(isUserLoggedIn())
            .subscribe((isLoggedIn) => {
                if (isLoggedIn == true) {
                    this._store.dispatch(this._defaultsActions.setLoading());
                    this._ngZone.runOutsideAngular(() => {
                        this._loadAppDefaults((defaults) => {
                            this._ngZone.run(() => {
                                this._store.dispatch(this._defaultsActions.setDefaults(defaults));
                                this._init$.next(true);
                            });
                        })
                    });
                }
            });
        this._authService.populate();
    }

    _loadAppDefaults(doneCallback: (defaults: any) => void) {
        Observable.zip(
            this._pluginsApi.find(),
            this._servicesApi.find(),
            (plugins, services) => [plugins, services])
            .subscribe(value => {
                doneCallback({
                    plugins: value[0],
                    services: value[1]
                });
            }, err => {
                console.error(err);
            })
    }
}
