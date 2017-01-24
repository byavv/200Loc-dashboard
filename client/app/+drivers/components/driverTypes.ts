import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, getDrivers } from '../../core'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './templates/driverTypes.tmpl.html',
    styleUrls: ['./styles/driverTypes.scss']
})
export class DriverTypesComponent implements OnInit {
    drivers: Array<any> = [];
    storeSub_n: Subscription;

    constructor(
        private router: Router,
        private _store: Store<AppState>) { }

    ngOnInit() {
        this.storeSub_n = this._store.let(getDrivers())
            .subscribe((drivers) => {
                this.drivers = drivers || [];
            });     
    }
    ngOnDestroy(){
        if(this.storeSub_n)this.storeSub_n.unsubscribe();
    }
}
