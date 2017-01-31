import {
    Component, Input, QueryList, AfterContentInit, HostBinding,
    ViewContainerRef, TemplateRef, ContentChildren, ViewRef
} from '@angular/core';

@Component({
    selector: 'ui-pane',
    template: `
        <div class='pane-content'>           
            <ng-content></ng-content>                    
        </div>
    `,
    styles: [
        `       
        .pane-content{  
            flex: 1;        
            display: flex;
            flex-direction: column;           
        }
        :host {
            display: flex;
            flex: 1;
            flex-direction: column;
        }
        :host.hidden {
            display: none;
        }
    `
    ],
})
export class UiPane {
    @HostBinding('class.hidden') get current() { return !this.active; }
    @Input()
    id: string;
    @Input()
    valid: boolean = true;
    visited: boolean = false;
    @Input() title: string;
    private _active: boolean = false;
    constructor() { }
    @Input() set active(active: boolean) {
        if (active == this._active) return;
        this._active = active;
    }
    get active(): boolean {
        return this._active;
    }
}