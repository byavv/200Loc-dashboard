import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'entry-indicator',
    templateUrl: './entries-list-indicator.component.tmpl.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesIndicatorComponent implements OnInit {
    @Input() messages: Array<any> = [];
    @Input() errors: Array<any> = [];
    @Input() type: string = 'blank';
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() { }
}