import {
    Component, OnInit, TemplateRef,
    ViewContainerRef, Input, Output,
    Injector, ElementRef, EmbeddedViewRef,
    Renderer, ComponentFactoryResolver,
    ViewRef, ViewChild, HostListener, EventEmitter,
    trigger, state,
    transition, style, animate
} from '@angular/core';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'loc-side-bar',
    templateUrl: './sidebar.component.html',
    exportAs: 'locSidebar',
    animations: [
        trigger('slideInOut', [
            state('left in', style({
                transform: 'translateX(-280px)',
                opacity: '0'
            })),
            state('left out', style({
                transform: 'translateX(0)',
                opacity: '1'
            })),
            state('right in', style({
                transform: 'translateX(100%)',
                opacity: '0'
            })),
            state('right out', style({
                transform: 'translateX(calc(100% - 280px))',
                opacity: '1'
            })),
            transition('* => *', animate('250ms cubic-bezier(0.4,0.0,0.2,1)'))
        ]),
    ]
})
export class SideBarComponent implements OnInit {
    @Input() content: TemplateRef<any>;
    @Input() closeOutClick: boolean = true;
    @Input() position: string = 'left';
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
    @Output('closed') closed = new EventEmitter<any>();
    @Output('opened') opened = new EventEmitter<any>();
    state$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _eViewRef: EmbeddedViewRef<any>;
    active: boolean = false;

    xDown = null;
    yDown = null;

    barState;

    constructor(
        private _elementRef: ElementRef, private _renderer: Renderer, private _injector: Injector,
        private _componentFactoryResolver: ComponentFactoryResolver, private _viewContainerRef: ViewContainerRef) {
    }

    @HostListener('click', ['$event'])
    public onClick($event: MouseEvent): void {
        $event.stopPropagation();
    }

    @HostListener("document:click", ['$event'])
    onDocumentClick(event): void {
        if (this.closeOutClick) {
            if (this._elementRef.nativeElement.contains(event.target)) return;
            this.close();
        }
    }

    public ngOnInit(): any {
        this.setState(false)
    }

    setState(active) {
        this.barState = `${this.position} ${active ? 'out' : 'in'}`;
    }

    ngAfterViewInit() {
        Observable.fromEvent(this._elementRef.nativeElement, 'touchstart')
            .subscribe((touchEvent: any) => {
                this.xDown = <TouchEvent>touchEvent.touches[0].clientX;
                this.yDown = <TouchEvent>touchEvent.touches[0].clientY;
            });

        Observable
            .fromEvent(this._elementRef.nativeElement, 'touchmove')
            .subscribe((touchEvent: any) => {
                const touchCurrent = <TouchEvent>touchEvent;

                var xUpCurr = touchCurrent.touches[0].clientX;
                var yUpCurr = touchCurrent.touches[0].clientY;
                var xDiff = this.xDown - xUpCurr;
                var yDiff = this.yDown - yUpCurr;

                if ((Math.abs(xDiff) > Math.abs(yDiff))) {
                    if (xDiff > 0) {
                        // swipe to the left
                        if (Math.abs(xDiff) > 60)
                            (this.position == 'right') ? this._open() : this.close();
                    } else {
                        // swipe to the right
                        if (Math.abs(xDiff) > 60)
                            (this.position == 'right') ? this.close() : this._open();
                    }
                } else {
                    if (yDiff > 0) {
                        /* up swipe */
                    } else {
                        /* down swipe */
                    }
                }
            });
    }

    private _open(content?: TemplateRef<any>, context?: any) {
        console.log('CONTEXT', context)
        if (!this._eViewRef || this._eViewRef.destroyed) {
            this._eViewRef = this._buildContentRef(content || this.content, context || this);

        }
    }

    private _buildContentRef(content: string | TemplateRef<any>, context?: any): EmbeddedViewRef<any> {
        if (this.container)
            return this.container.createEmbeddedView(<TemplateRef<any>>content, context);
    }

    open($event, content?: TemplateRef<any>, context?: any) {
        $event.stopPropagation();
        this._open(content, context);
        this.active = true;
        this.setState(this.active)
        this.state$.next(this.active);
    }
    
    close() {
        this.active = false;
        this.setState(this.active)
        this.state$.next(this.active);
        if (this._eViewRef) {
            setTimeout(() => {
                this._eViewRef.destroy();
            }, 250); // after animation
        }
    }
}
