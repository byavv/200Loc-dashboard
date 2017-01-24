import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppController } from './shared/services'
import { CoreConfig, LoopBackAuth } from './core';

import '../theme/styles.scss';

@Component({
    selector: 'app',
    template: `
    
    <div class="l-page__wrap">
        <loader [active]='loading' [async]='appController.init$'></loader>
        <header class="l-page__header">
            <loc-header class='authH'></loc-header>
        </header>        
        <div [hidden]='loading' class='l-container'>
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
