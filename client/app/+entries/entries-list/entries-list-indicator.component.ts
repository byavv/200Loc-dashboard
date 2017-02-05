import {
    Component, OnInit, Input, ChangeDetectionStrategy,
    Output, EventEmitter, Renderer, ElementRef,
    trigger, state, style, transition, animate, keyframes
} from '@angular/core';

@Component({
    selector: 'entry-indicator',
    templateUrl: './entries-list-indicator.component.tmpl.html',
    changeDetection: ChangeDetectionStrategy.OnPush,   
    styleUrls: ['./indi.scss'],
    animations: [
        trigger('iconState', [
            state('up', style({ transform: 'rotate(0deg)' })),
            state('down', style({ transform: 'rotate(180deg)' })),
            transition('up => down', animate('.4s ease-in')),
            transition('down => up', animate('.4s ease-out')),
        ])
    ]
})
export class EntriesIndicatorComponent {
    @Input() messages: Array<any> = [];
    @Input() errors: Array<any> = [];
    @Input() type: string = 'blank';
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    _up: boolean = false;
    state: string = 'down'

    @Input()
    public get up(): boolean {
        return this._up;
    }
    public set up(value) {
        this.state = value ? 'up' : 'down';
        this._up = value;
    }
    constructor(private _renderer: Renderer, elementRef: ElementRef) { }
}