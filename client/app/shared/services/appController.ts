import { Injectable, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReplaySubject, Observable } from "rxjs";

import { BackEnd } from "./backEndApi";
import { Store } from '@ngrx/store';
import { AppState } from '../../core/reducers';
import { DefaultsActions } from '../../core/actions';

@Injectable()
export class AppController { 
    constructor(private _backEnd: BackEnd,
        private _store: Store<AppState>,
        private _defaultsActions: DefaultsActions,
        private _ngZone: NgZone) { }

    start() {
        this._ngZone.runOutsideAngular(() => {
            this._loadAppDefaults((defaults) => {
                this._ngZone.run(() => {                   
                    this._store.dispatch(this._defaultsActions.setDefaults(defaults))
                });
                console.log("APPLICATION STARTED");
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
