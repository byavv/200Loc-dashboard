import {
    Directive, ElementRef, Output, EventEmitter,
    HostListener, OnDestroy, OnInit, Input
} from '@angular/core';

@Directive({
    selector: '[clickedOut]'
})
export class OutClickDirective {
    @Input('ignore') public ignore: HTMLElement;
    @Input('ignoreSelector') public ignoreSelector: string | Array<string>;
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public clickedOut = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        if (this.ignore && (event.target == this.ignore && this.ignore.contains(<HTMLElement>event.target))) {
            return;
        }
        console.log(this.ignoreSelector)
        if (this.ignoreSelector) {
            let selectors = this.ignoreSelector;
            if (Array.isArray(this.ignoreSelector)) {
                selectors = this.ignoreSelector.join(',');
            }
            for (let node of <Node[]><any>document.querySelectorAll(<string>selectors)) {
                if (node.contains(targetElement)) {
                    console.log('contains', node)
                    return;
                }
            }
        }

        if (!this._elementRef.nativeElement.contains(targetElement)) {
            this.clickedOut.emit(event);
        }
    }
}