import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, OnDestroy, Host, Optional } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToggleGroup } from '../../controls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Config } from '../../../core/models';
import { AppController } from '../../../shared/services';
import { LoaderComponent } from '../../../shared/components';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, getConfigState } from '../../../core/reducers';
import { MasterActions, ValidationActions } from '../../../core/actions';

@Component({
    selector: 'step-general',
    templateUrl: "./templates/stepGeneral.html",
    styleUrls: ['./styles/stepGeneral.scss']
})
export class StepGeneral implements AfterViewInit {
    @Output()
    next: EventEmitter<any> = new EventEmitter();
    @Output()
    validation: EventEmitter<any> = new EventEmitter();
    form: FormGroup;

    apiConfig: any = {
        methods: []
    };

    loading: boolean = false;
    configStateSub_n: Subscription;
    @Input()
    submitted: boolean = false;

    options = [
        { name: 'GET', description: 'GET' },
        { name: 'POST', description: 'POST' },
        { name: 'PUT', description: 'PUT' },
        { name: 'DELETE', description: 'DELETE' }
    ];

    constructor(
        private _store: Store<AppState>,
        private _masterActions: MasterActions,
        private _validationActions: ValidationActions,
        private _fb: FormBuilder) {
        this.form = _fb.group({
            name: ["", Validators.required],
            entry: ["", Validators.required],
            description: [""],
            methods: [['GET']]
        });
    }

    ngAfterViewInit() {
        this.loading = true;
        this._store.dispatch(this._validationActions.setValidity({ general: this.form.valid }));
        this.validation.emit(this.form.valid);

        this.form
            .valueChanges
            .distinctUntilChanged()
            .subscribe((value) => {
                for (let KEY in value) {
                    if (value[KEY] == undefined) return;
                }
                this._store.dispatch(this._masterActions.setGeneralInfoData(value));
                this._store.dispatch(this._validationActions.setValidity({ general: this.form.valid }));
                this.validation.emit(this.form.valid);
            });

        this.configStateSub_n = this._store
            .let(getConfigState())
            .subscribe((config) => {
                this.loading = false;
                this.apiConfig = config;
            });
    }
    ngOnDestroy() {
        if (this.configStateSub_n) {
            this.configStateSub_n.unsubscribe();
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            this.next.emit('plugins');
        }
    }
}
