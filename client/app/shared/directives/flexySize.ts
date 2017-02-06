import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Directive({
    selector: '[flexy]',
})
export class FlexySize {
    private _doc: HTMLDocument;
    private _domAdapter: DomAdapter;
    @Input() bottom: number = 0;

    ignoreElementSize = false;
    constructor(public element: ElementRef, private renderer: Renderer) {
        this._domAdapter = getDOM();
        this._doc = this._domAdapter.defaultDoc();
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('window', 'resize', (evt: any) => {
            this._setMinHeight();
        });
        this._setMinHeight();
    }

    _setMinHeight() {
        var docHeight = this._doc.documentElement.clientHeight;
        var docWidth = this._doc.documentElement.clientWidth;
        let rect = this._domAdapter.getBoundingClientRect(this.element.nativeElement);
        if (docWidth < 768) {
            this.renderer.setElementStyle(this.element.nativeElement, 'min-height', `${docHeight - rect.top}px`);
        } else {
            this.renderer.setElementStyle(this.element.nativeElement, 'min-height', `${docHeight - rect.top - this.bottom}px`);
        }
    }
    _reset() {
        this.renderer.setElementStyle(this.element.nativeElement, 'min-height', `auto`);
        this.renderer.setElementStyle(this.element.nativeElement, 'transition-duration', `${0}ms`);
    }
}