import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppController } from './shared/services'
import { CoreConfig, LoopBackAuth, AppState, getAuthenticationState, DefaultsActions, getLoaded } from './core';
import { Store } from '@ngrx/store'

import '../theme/styles.scss';

@Component({
    selector: 'app',
    template: `
    
    <div class="l-page__wrap">
        <loader [trigger]='getLoaded()'></loader>
        <header class="l-page__header">
            <loc-header class='authH'></loc-header>
        </header>        
        <div class='l-container'>
            <router-outlet>
            </router-outlet>
        </div>       
    </div>
    <footer class='l-page__footer'> 
        <loc-footer class='authH'></loc-footer>  
    </footer>
   
    
    `
})
export class AppComponent {
    constructor(
        public appController: AppController,
        public authService: LoopBackAuth,
        private _store: Store<AppState>,
        public defaultsAction: DefaultsActions,
        public viewContainerRef: ViewContainerRef) {
        if ('production' === ENV) {
            CoreConfig.setBaseURL('');
        } else {
            CoreConfig.setBaseURL('http://localhost:5601');
        }
     //   this.authService.populate();
        this.appController.start();
    }
    getLoaded() {
        return this._store
            .let(getLoaded())
            .map(value => !value);
    }
}
