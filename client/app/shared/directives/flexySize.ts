import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Directive({
    selector: '[flexy]',
})
export class FlexySize {
    private _doc: HTMLDocument;
    private _domAdapter: DomAdapter;

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
        var scrollTop = this._doc.documentElement.scrollTop || this._doc.body.scrollTop;
        var docHeight = this._doc.documentElement.clientHeight;
        var docWidth = this._doc.documentElement.clientWidth;
        const footerHeight = docWidth > 769 ? 60 + 10/*padding*/ : 0;
        var rect = this._domAdapter.getBoundingClientRect(this.element.nativeElement);
        this._domAdapter.setStyle(this.element.nativeElement, 'min-height', `${docHeight - rect.top - footerHeight}px`);
    }

    _reset() {
        this._domAdapter.setStyle(this.element.nativeElement, 'min-height', `auto`);
        this._domAdapter.setStyle(this.element.nativeElement, 'transition-duration', `${0}ms`);
    }
}