import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppController } from './shared/services'
import { environment } from '../environments/environment';
import { LoopBackConfig } from './app.config';

@Component({
    selector: 'app',
    templateUrl: './app.component.tmpl.html'
})

export class App {
    loading = true;
    constructor(private appController: AppController,
        public viewContainerRef: ViewContainerRef) {
        if (environment.production) {
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
