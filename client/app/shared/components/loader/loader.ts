import {
    Component, OnInit, Input,
    Output, EventEmitter, OnDestroy,
    Renderer, ElementRef, ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'loader',
    template: `

    <div class='loader-container' *ngIf='pActive' [class.overlay]='overlay'>      
         <div class='ball-pulse' [class.spinner]='spinner'>
            <div></div>
            <div></div>
            <div></div>
         </div>
    </div>

    `,
    styleUrls: ['./loader.scss'],
    host: {
        '[style.height]': 'active ? "100%":"auto"'
    }
})
export class LoaderComponent implements OnInit, OnDestroy {
    private _subscription: Subscription
    private _active: boolean;
    protected pActive: boolean;

    @Input()
    async: Observable<any>;
    @Input()
    delay: number = 0;

    @ViewChild('container') container: ElementRef;

    @Input()
    trigger: Observable<any>;

    @Input()
    overlay: boolean = true;

    @Input()
    public get active(): boolean {
        return this._active;
    }
    public set active(value) {
        this._active = value;
        if (!value) {
            setTimeout(() => {
                this.pActive = value;
                this.completed.next(this.active);
            }, this.delay);
        } else {
            this.pActive = value;
        }
    }

    @Input()
    spinner: boolean = true;
    @Output()
    completed: EventEmitter<any> = new EventEmitter();
    constructor(private _renderer: Renderer) { }

    ngOnInit() {
        if (this.trigger) {
            this.trigger.share()
                .subscribe(value => {
                    this.active = value;
                });
        }
        if (this.async)
            this._subscription = this.async
                .subscribe(() => {
                    this.active = false;
                }, (err) => {
                    this.active = false;
                })
    }

    toggle() {
        this.active = !this.active
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
