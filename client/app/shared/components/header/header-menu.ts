import { Component, Input, Output, EventEmitter, HostListener, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'loc-header-menu',
    templateUrl: './header-menu.html',
    exportAs: 'locHeaderMenu'
})
export class HeaderDropdownComponent {
    public active: boolean = false;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer,
        private router: Router)
    { }

    onRedirect(): void {
        this.setActive(false);      
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
