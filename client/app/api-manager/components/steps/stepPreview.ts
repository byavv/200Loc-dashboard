import {
    Component, OnInit, Output, Input,
    EventEmitter, OnDestroy, Host,
    Optional, ViewChild, ViewChildren,
    QueryList, SimpleChanges
} from '@angular/core';

import { TabDirective, ModalDirective } from 'ng2-bootstrap'
import { Router, ActivatedRoute } from "@angular/router";
import { ShowError } from '../../directives/showError';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config } from '../../../core/models';
import { BackEnd, AppController } from '../../../shared/services';
import { MasterController } from '../../services/masterController';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, getMasterState, getPlugins, getMasterConfigPlugins } from '../../../core/reducers';
import { MasterActions, ValidationActions } from '../../../core/actions';

@Component({
    selector: 'step-preview',
    templateUrl: "./templates/stepPreview.html",
    styleUrls: ['./styles/stepPreview.scss']
})
export class StepPreview {
    @Output()
    next: EventEmitter<any> = new EventEmitter();

    @ViewChildren(TabDirective) tabs: QueryList<TabDirective>;
    @ViewChild(ModalDirective) resultModal: ModalDirective;

    loading: boolean = false;
    submitted: boolean = false;
    text: string = "";
    body: any;
    aceOptions: any = { maxLines: 1000, printMargin: false };
    entry: string;
    methods: Array<any> = [];
    bodyDisabled: boolean = false;
    result: any;

    headers = [
        // { key: 'content', value: 'application/json' }        
    ];
    params = [
        // todo: implememnt query string future
        // { key: 'query', value: 'string' }
    ];

    private _selectedMethod: string;
    config: Config = {};
    get selectedMethod() {
        return this._selectedMethod;
    }
    set selectedMethod(value) {
        this.bodyDisabled = value == 'GET';
        this._selectedMethod = value;
    }

    constructor(
        private _masterActions: MasterActions,
        private _validationActions: ValidationActions,
        private backEnd: BackEnd,
        private _store: Store<AppState>
    ) {}

    ngOnInit() {
        this._store.let(getMasterState())
            .subscribe((config: Config) => {
                this.config = config;
                if (config.methods)
                    this.selectedMethod = config.methods[0];
            });
    }

    onChange(code) {
        try {
            this.body = JSON.parse(code);
        } catch (error) {

        }
    }

    methodChange(method: string) {
        this.selectedMethod = method;
        let tabs = this.tabs.toArray();
        if (tabs[2].active) {
            tabs[0].active = true;
        }
    }

    onSubmit() {
        this.next.next("Done");
    }

    send() {
        this.backEnd.testApiConfig(this.selectedMethod, this.config.plugins, this.headers, this.params, this.body)
            .subscribe((res) => {
                this.resultModal.show();
                this.result = res.body;
            }, err => {
                console.error(err)
            });
    }
}