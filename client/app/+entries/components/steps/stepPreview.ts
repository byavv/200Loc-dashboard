import {
    Component, OnInit, Output, Input,
    EventEmitter, OnDestroy, Host,
    Optional, ViewChild, ViewChildren,
    QueryList, SimpleChanges, TemplateRef
} from '@angular/core';

//import { TabDirective, ModalDirective } from 'ng2-bootstrap'
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config } from '../../../core/models';
import { CustomBackEndApi, AppController } from '../../../shared/services';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, getMasterState, getPlugins, getMasterConfigPlugins } from '../../../core/reducers';
import { MasterActions, ValidationActions } from '../../../core/actions';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'step-preview',
    templateUrl: "./templates/stepPreview.html",
    styleUrls: ['./styles/stepPreview.scss']
})
export class StepPreview {
    @Output()
    next: EventEmitter<any> = new EventEmitter();

    @ViewChild('close') public close;
    @ViewChild('contentPreview') content: TemplateRef<any>;

    // @ViewChildren(TabDirective) tabs: QueryList<TabDirective>;
    // @ViewChild(ModalDirective) resultModal: ModalDirective;

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
        private backEnd: CustomBackEndApi,
        private modalService: NgbModal,
        private _store: Store<AppState>
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
        this.backEnd.testApiConfig(this.selectedMethod, this.config.plugins, this.headers, this.params, this.body)
            .subscribe((res) => {

                this.modalRef = this.modalService
                    .open(this.content, { windowClass: 'oh-modal' });


                this.modalRef.result.then((result) => {

                }, (reason) => {

                });

                // this.resultModal.show();
                this.result = res.body;
            }, err => {
                console.error(err)
            });
    }

    onOk() {
        if (this.modalRef) {
            this.modalRef.close();
        }
    }
}