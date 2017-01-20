import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppController } from './shared/services'
import { LoopBackConfig } from './app.config';

import '../theme/styles.scss';

@Component({
    selector: 'app',
    templateUrl: './app.component.tmpl.html'
})
export class AppComponent {
    loading = true;
    constructor(public appController: AppController,
        public viewContainerRef: ViewContainerRef) {
        if ('production' === ENV) {
            LoopBackConfig.setBaseURL('');
        } else {
            LoopBackConfig.setBaseURL('http://localhost:5601');
        }
        //this.appController.init$.subscribe(() => {
            this.loading = false;
      // })
        this.appController.start();
    }
}
