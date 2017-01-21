import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppController } from './shared/services'
import { CoreConfig, LoopBackAuth } from './core';

import '../theme/styles.scss';

@Component({
    selector: 'app',
    template: `
    
    <div class="page-wrap">
        <loader [active]='loading' [async]='appController.init$'></loader>
        <app-header></app-header>
        <div [hidden]='loading' class='l-container'>
            <router-outlet>
            </router-outlet>
        </div>
    </div>
    <app-footer></app-footer>
    
    `
})
export class AppComponent {
    loading = true;
    constructor(
        public appController: AppController,
        public authService: LoopBackAuth,
        public viewContainerRef: ViewContainerRef) {
        if ('production' === ENV) {
            CoreConfig.setBaseURL('');
        } else {
            CoreConfig.setBaseURL('http://localhost:5601');
        }
        this.appController.init$
            .subscribe(() => {
                this.loading = false;
            })
        this.appController.start();
        this.authService.populate();
    }
}
