import {
    FormControl
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import {
    Component,
    Host,
    Input,
    OnInit,
    OnDestroy,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'show-error',
    template: `        
     <small> {{ error }} </small>
    `,
    styles: [
        `       
        :host-context(.ng-invalid) small {
            display: block!important;
            font-size: 12px;         
            color: #f2374d;
            position: static;
        }
        :host-context(.ng-valid) small {
            display: none;          
        }

        `
    ]
})
export class ShowValidationError implements OnInit, OnDestroy {
    @Input('options')
    errors: { [code: string]: string; } = {};
    @Input('control') control: FormControl;

    error: string;
    subscription: Subscription;

    ngOnInit() {
        if (this.control) {
            this.validate();
            this.subscription = this.control
                .valueChanges
                .subscribe(this.validate.bind(this));
        }
    }

    private validate() {
        if (this.control.errors) {
            for (var error in this.errors) {
                if (!!this.control.errors[error]) {
                    this.error = this.errors[error];
                }
            }
        } else {
            this.error = '';
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}