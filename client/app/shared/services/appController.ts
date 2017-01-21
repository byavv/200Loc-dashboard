import { Injectable, NgZone, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReplaySubject, Observable } from "rxjs";

import { CustomBackEndApi } from "./backEndApi";
import { Store } from '@ngrx/store';
import { AppState } from '../../core/reducers';
import { DefaultsActions } from '../../core/actions';

@Injectable()
export class AppController {
    init$: ReplaySubject<any> = new ReplaySubject();
    constructor(private _backEnd: CustomBackEndApi,
        private _store: Store<AppState>,
        private _defaultsActions: DefaultsActions,
        private _ngZone: NgZone) { }

    start() {
        this._ngZone.runOutsideAngular(() => {
            this._loadAppDefaults((defaults) => {
                this._ngZone.run(() => {
                    this._store.dispatch(this._defaultsActions.setDefaults(defaults));
                    this.init$.next(true);
                });
                console.log(`APPLICATION STARTED IN ${isDevMode ? 'DEV' : 'PROD'} MODE`);
            })
        });
    }

    _loadAppDefaults(doneCallback: (defaults: any) => void) {
        Observable.zip(
            this._backEnd.getPlugins(),
            this._backEnd.getAvailableDrivers(),
            (plugins, drivers) => [plugins, drivers])
            .subscribe(value => {
                doneCallback({
                    plugins: value[0],
                    drivers: value[1]
                });
            }, err => {
                console.log(err);
            })
    }
}
