import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, OnDestroy, Host, Optional } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ShowError } from '../../directives/showError';
import { ToggleGroup } from '../../controls';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Config } from '../../../core/models';
import { BackEnd, AppController } from '../../../shared/services';
import { LoaderComponent } from '../../../shared/components';
import { MasterController } from '../../services/masterController';
import { Observable } from 'rxjs';

@Component({
    selector: 'step-general',
    templateUrl: "./templates/stepGeneral.html",
    styleUrls: ['./styles/stepGeneral.scss']
})
export class StepGeneral implements AfterViewInit {
    @Output()
    next: EventEmitter<any> = new EventEmitter();
    form: FormGroup;

    apiConfig: any = {
        methods: []
    };

    loading: boolean = false;
    submitted: boolean = false;
    options = [
        { name: 'GET', description: 'GET' },
        { name: 'POST', description: 'POST' },
        { name: 'PUT', description: 'PUT' },
        { name: 'DELETE', description: 'DELETE' }
    ]
    constructor(
        private master: MasterController,
        fb: FormBuilder) {
        this.form = fb.group({
            name: ["", Validators.required],
            entry: ["", Validators.required],
            description: [""],
            methods: ['GET']
        });
    }

    ngAfterViewInit() {
        this.loading = true;
        this.master.setValidity('general', this.form.valid);
        this.form
            .valueChanges
            .distinctUntilChanged()
            .subscribe(value => {
                this.master.setValidity('general', this.form.valid);
            });

        this.master.error$.subscribe(value => {
            console.log("ERROR", value)
            this.submitted = true;
            this.form.markAsTouched();
        });
        this.master.init$.subscribe((config) => {
            this.loading = false;
            this.apiConfig = config;
        });
    }

    onSubmit(form: FormGroup) {
        this.submitted = true;
        if (form.valid) {
            this.next.emit('plugins');
        }
    }
}
