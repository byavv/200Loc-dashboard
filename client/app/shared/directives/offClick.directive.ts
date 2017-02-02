import {
    Directive, HostListener, Input,
    OnInit, OnDestroy, ElementRef
} from '@angular/core';

@Directive({
    selector: '[offClick]'
})
export class OffClickDirective implements OnInit, OnDestroy {
    /* tslint:disable */
    @Input('offClick') public offClickHandler: any;
    @Input('ignore') public ignore: HTMLElement;

    /* tslint:enable */
    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
        $event.stopPropagation();
    }
    constructor(private _elementRef: ElementRef) {

    }

    public ngOnInit(): any {
        setTimeout(() => {
            document.addEventListener('click', (event: Event) => {
                if (this.ignore && (event.target !== this.ignore && !this.ignore.contains(<HTMLElement>event.target))) {
                    this.offClickHandler()
                } else {
                    if (!this._elementRef.nativeElement.contains(<HTMLElement>event.target)) {
                        this.offClickHandler();
                    }
                    //  if (this.popoverDiv.nativeElement.contains(event.target) || this.popover.getElement().contains(event.target)) return;
                }
            });
        }, 0);
    }

    public ngOnDestroy(): any {
        document.removeEventListener('click', this.offClickHandler);
    }
}