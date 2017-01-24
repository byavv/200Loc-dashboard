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
@Component({
    selector: 'ui-tabs',
    template: ` 
        <div class='l-container'>
            <div class="l-row">
               <div class="col-sm-12 col-md-2 padding-shrink-right l-col">           
                  <ul class="my-steps">
                      <li *ngFor="let pane of panes" class='{{ pane.id }}' 
                          (click)="goTo(pane.id)"
                          role="presentation" 
                          [ngClass] = "{ invalid: !pane.valid, active: pane.active, visited: pane.visited }">
                          <i class='fa'></i>
                          <span>{{ pane.title }}</span> 
                      </li>
                  </ul>            
               </div>
               <div class="col-sm-12 col-md-10 padding-shrink-left l-col" rest-height style='display: flex;'>                
                    <ng-content></ng-content>                        
               </div>
            </div>
      </div>
       
    `,   
    styleUrls: [
        './styles/tabs.scss'
    ]  
})
export class UiTabs {
    @ContentChildren(UiPane) panes: QueryList<UiPane>;
    currentPane: UiPane;
    @Input()
    default: string;
    ngAfterContentInit() {
        if (this.panes) {
            this.default
                ? this.currentPane = this.panes.toArray().find((p: UiPane) => p.id == this.default)
                : this.currentPane = this.panes.first;
            this.currentPane.active = true;
        }
    }
    goTo(id) {
        if (this.panes) {
            if (this.currentPane) {
                this.currentPane.visited = true;
            }
            this.panes.toArray().forEach((p: UiPane) => p.active = false);
            this.currentPane = this.panes.toArray().find((p: UiPane) => p.id == id);
            this.currentPane.active = true;
        }
    }
}