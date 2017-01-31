import {
    Component, OnInit, Output, Input,
    EventEmitter, OnDestroy, Host,
    Optional, ViewChild, ViewChildren,
    QueryList, SimpleChanges, TemplateRef
} from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Config, ApiConfigApi } from '../../core';
import {
    AppState, getMasterState,
    getPlugins, getMasterConfigPlugins
} from '../../core/reducers';
import { MasterActions, ValidationActions } from '../../core/actions';

import { AppController } from '../../shared/services';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'step-preview',
    templateUrl: "./entries-wizard-step-preview.component.tmpl.html",
    styleUrls: ['./stepPreview.scss']
})
export class EntriesWizardStepPreview {
    @Output()
    next: EventEmitter<any> = new EventEmitter();

    @ViewChild('close') public close;
    @ViewChild('contentPreview') content: TemplateRef<any>;

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
    public testresult = 'text';


    constructor(
        private _masterActions: MasterActions,
        private _validationActions: ValidationActions,
        private modalService: NgbModal,
        private _store: Store<AppState>,
        private _apiConfig: ApiConfigApi
    ) { }

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
        /*  let tabs = this.tabs.toArray();
          if (tabs[2].active) {
              tabs[0].active = true;
          }*/
    }

    onSubmit() {
        this.next.next("Done");
    }

    modalRef: NgbModalRef;

    send() {
        this.testresult = 'text';
        this._apiConfig.testApiConfig(this.selectedMethod, this.config.plugins, this.headers, this.params, this.body)
            .subscribe((res: any) => {
                this.modalRef = this.modalService
                    .open(this.content, { windowClass: 'test-results-modal' });
                this.modalRef.result.then((result) => {
                }, (reason) => {

                });
                this.result = res.body;
                if (typeof this.result == 'string' && this.result.toLowerCase().startsWith('<!doctype')) {
                    this.testresult = 'html';
                } else {
                    let json;
                    try {
                        this.result = JSON.parse(this.result);
                        this.testresult = 'json';
                    } catch (error) {
                        this.testresult = 'text';
                    }
                }
            }, err => {
                console.error(err)
            });
    }

    prettifyJson(json: string) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 4);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    onOk() {
        if (this.modalRef) {
            this.modalRef.close();
        }
    }
}