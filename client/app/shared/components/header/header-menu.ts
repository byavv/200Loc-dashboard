import { Component, Input, Output, EventEmitter, HostListener, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
//import { Notification } from './notification.model';

@Component({
    selector: 'loc-header-menu',
    templateUrl: './header-menu.html',
    exportAs: 'locHeaderMenu'
})
// TODO: REIMPLEMENT. USE ONLY CONTENT. THE REST -> TO SHARED
export class HeaderDropdownComponent {
    public active: boolean = false;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer,
        private router: Router)
    { }

    onRedirect(/*notification: Notification*/): void {
        this.setActive(false);
        //  this.router.navigate([notification.action]);
    }

    setActive(active: boolean): void {
        this.active = active;
    }

    toggleActive($event?: MouseEvent): void {
        if ($event)
            $event.stopPropagation();
        this.active = !this.active;
    }


    @HostListener('click', ['$event'])
    public onClick($event: MouseEvent): void {
        $event.stopPropagation();
    }

    @HostListener("document:click", ['$event'])
    onDocumentClick(event): void {
        if (this._elementRef.nativeElement.contains(event.target)) return;
        this.active = false;
    }
}
