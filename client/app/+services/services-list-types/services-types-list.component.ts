import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, getServices } from '../../core'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './services-types-list.component.tmpl.html'   
})
export class ServicesTypesListComponent implements OnInit {
    services: Array<any> = [];
    storeSub_n: Subscription;

    constructor(
        private router: Router,
        private _store: Store<AppState>) { }

    ngOnInit() {
        this.storeSub_n = this._store.let(getServices())
            .subscribe((services) => {
                this.services = services || [];
            });     
    }
    ngOnDestroy(){
        if(this.storeSub_n)this.storeSub_n.unsubscribe();
    }
}
