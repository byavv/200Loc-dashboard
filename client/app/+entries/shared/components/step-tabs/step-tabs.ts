import {
    Component, Input, QueryList, AfterContentInit, HostBinding,
    ViewContainerRef, TemplateRef, ContentChildren, ViewRef
} from '@angular/core';
import { UiPane } from './step-tabs-pane';

@Component({
    selector: 'ui-tabs',
    templateUrl: './step-tabs.tmpl.html',
    styleUrls: [
        './tabs.scss'
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