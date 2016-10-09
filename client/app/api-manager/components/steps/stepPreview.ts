import {
    Component, OnInit, Output, Input,
    EventEmitter, OnDestroy, Host,
    Optional, ViewChild, ViewChildren,
    QueryList
} from '@angular/core';

import { TabDirective } from 'ng2-bootstrap'
import { Router, ActivatedRoute } from "@angular/router";
import { ShowError } from '../../directives/showError';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config } from '../../../shared/models';
import { BackEnd, AppController } from '../../../shared/services';
import { MasterController } from '../../services/masterController';
import { Observable } from 'rxjs';

@Component({
    selector: 'step-preview',
    template: require("./templates/stepPreview.html"),
    styles: [require('./styles/stepPreview.scss')]
})
export class StepPreview implements OnInit {
    @Output()
    next: EventEmitter<any> = new EventEmitter();

    @ViewChildren(TabDirective) tabs: QueryList<TabDirective>;

    loading: boolean = false;
    submitted: boolean = false;
    text: string = "";
    body: any;
    aceOptions: any = { maxLines: 1000, printMargin: false };
    entry: string;
    methods: Array<any> = [];
    bodyDisabled: boolean = false;

    headers = [
        { key: 'Content', value: 'application/json' },
        { key: 'test', value: 'supertest' }
    ];
    params = [
        { key: 'query', value: 'string' }
    ];

    selectedMethod: string;

    constructor(
        private master: MasterController,
        fb: FormBuilder,
        private backEnd: BackEnd,
        private appController: AppController) {

    }
    ngOnInit() {
        this.master.init$.subscribe(() => {
            this.entry = this.master.config.entry;
            this.methods = this.master.config.methods;
            this.selectedMethod = this.methods[0];
        })
    }

    onChange(code) {
        try {
            this.body = JSON.parse(code);
        } catch (error) {

        }
    }

    methodChange(method: string) {
        if (method == 'POST') {
            this.bodyDisabled = true;
            let tabs = this.tabs.toArray()
            if (tabs[2].active) {
                tabs[0].active = true;
            }
        } else {
            this.bodyDisabled = false;
        }
        console.log(method)
    }

    onSubmit() {
        this.next.next("Done");
    }

    send() {
        this.backEnd.testApiConfig(this.selectedMethod, this.master.config.plugins, this.headers, this.params, this.body)
            .subscribe((res) => {
                console.log(res);
            }, err => {
                console.error(err)
            })
        console.log(this.master.config.plugins, JSON.parse(this.text))
    }
}