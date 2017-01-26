import {
    Component, Input, AfterViewInit,
    ElementRef, ChangeDetectorRef,
    HostListener,
    OnDestroy, ViewChild, EventEmitter, Renderer
} from "@angular/core";
import { Popover } from "./popover";

@Component({
    selector: "popover-content",
    template: `
        <div #popoverDiv class="popover {{ effectivePlacement }}"
            [style.top]="top + shiftTop + 'px'"
            [style.left]="left + shiftLeft + 'px'"             
            [class.in]="isIn"
            [class.fade]="animation"
            [style.width]="calculateWidth()"
            style="display: block"
            role="popover">
            <div [hidden]="!closeOnMouseOutside" class="virtual-area"></div>
            <div class="popover-arrow" #popoverArrow></div> 
            <h3 class="popover-title" [hidden]="!title">{{ title }}</h3>
            <div class="popover-content">
                <ng-content></ng-content>
                {{ content }}
            </div> 
        </div>
    `,
    styleUrls: ['./popover.scss']
})
export class PopoverContent implements AfterViewInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs / Outputs 
    // -------------------------------------------------------------------------

    isHidden: boolean;
    @Input()
    content: string;

    @Input()
    placement: "top" | "bottom" | "left" | "right" | "auto" | "auto top" | "auto bottom" | "auto left" | "auto right" = "bottom";

    @Input()
    size: "sm" | "md" | "lg" = "md";

    @Input()
    floating: boolean = false;

    @Input()
    title: string;

    @Input()
    animation: boolean = true;

    @Input()
    shiftLeft: number = 0;

    @Input()
    shiftTop: number = 0;

    @Input()
    closeOnClickOutside: boolean = false;

    @Input()
    closeOnMouseOutside: boolean = false;

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    @ViewChild("popoverDiv")
    popoverDiv: ElementRef;

    @ViewChild("popoverArrow")
    popoverArrow: ElementRef;



    @Input()
    popover: Popover;

    onCloseFromOutside = new EventEmitter();
    top: number = -10000;
    left: number = -10000;
    isIn: boolean = false;
    displayType: string = "none";
    effectivePlacement: string;

    private _correctionX: number = 0;
    private _correctionY: number = 0;
    private _mobileMode: boolean = false;

    // -------------------------------------------------------------------------
    // Anonymous 
    // -------------------------------------------------------------------------

    /**
     * Closes dropdown if user clicks outside of this directive.
     */
    onDocumentMouseDown = (event) => {
        const element = this.element.nativeElement;
        if (!element || !this.popover) return;
        if (this.popoverDiv.nativeElement.contains(event.target) || this.popover.getElement().contains(event.target)) return;
        this.hide();
        this.onCloseFromOutside.emit(undefined);
    };

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(protected element: ElementRef,
        private renderer: Renderer,
        protected cdr: ChangeDetectorRef) { }
    // } constructor(private element: ElementRef, ) {
    //     this._domAdapter = getDOM();
    // }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    ngAfterViewInit(): void {
        if (this.closeOnClickOutside)
            document.addEventListener("mousedown", this.onDocumentMouseDown);
        if (this.closeOnMouseOutside)
            document.addEventListener("mouseover", this.onDocumentMouseDown);

        this.show();
        this.cdr.detectChanges();
        this.renderer.listenGlobal('window', 'resize', (evt: Event) => {

            // if (!this.isHidden) {
            //     this.hide();
            // }
            // let win: Window = <any>evt.target;
            // const innerWidth = win.innerWidth;
            // if (innerWidth <= 767) {
            //     this._mobileMode = true;
            // } else {
            //     this._mobileMode = false;
            // }




            if (this.floating && !this.isHidden) {
               // this.show();
                let win: Window = <any>evt.target;
                const innerWidth = win.innerWidth;
                if (innerWidth <= 767) {
                    this.renderer.setElementStyle(this.popoverDiv.nativeElement, 'width', innerWidth + 'px')
                } else {
                    this.renderer.setElementStyle(this.popoverDiv.nativeElement, 'width', this.calculateWidth())
                }
            }
        })
    }

    ngOnDestroy() {
        if (this.closeOnClickOutside)
            document.removeEventListener("mousedown", this.onDocumentMouseDown);
        if (this.closeOnMouseOutside)
            document.removeEventListener("mouseover", this.onDocumentMouseDown);
    }


    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    show(): void {
        if (!this.popover || !this.popover.getElement())
            return;

        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = "block";
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
        this.isHidden = false;
       /* console.log(this._mobileMode)
        if (this._mobileMode) {

            this.renderer.setElementStyle(this.popoverDiv.nativeElement, 'width', window.innerWidth + 'px');
        } else {
            this.renderer.setElementStyle(this.popoverDiv.nativeElement, 'width', this.calculateWidth());
        }*/
    }

    hide(): void {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        if (this.popover)
            this.popover.hide();
        this.isHidden = true;
    }

    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
    }

    calculateWidth() {
        if (this.size == 'md') return '350px';
        if (this.size == 'lg') return '450px';
        if (this.size == 'sm') return '250px';
        else return '250px';
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Positions element relative to host (click button)
     * 
     * @method correctPosition
     * @param   {HTMLElement}    host element to position from          HTMLElement
     * @param   {HTMLElement}    element to be positioned               HTMLElement
     * @param   {string}         placement (top, bottom, left, right)   string
     * @returns {Object}         placement                              Object
     */
    protected positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody: boolean = false): { top: number, left: number } {
        let positionStrParts = positionStr.split("-");
        let pos0 = positionStrParts[0];
        let pos1 = positionStrParts[1] || "center";
        let hostElPos = appendToBody ? this.getElementOffsetRect(hostEl) : this.position(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;

        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);

        let shiftWidth: any = {
            center: function (): number {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function (): number {
                return hostElPos.left;
            },
            right: function (): number {
                return hostElPos.left + hostElPos.width;
            }
        };

        let shiftHeight: any = {
            center: function (): number {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function (): number {
                return hostElPos.top;
            },
            bottom: function (): number {
                return hostElPos.top + hostElPos.height;
            }
        };

        let targetElPos: { top: number, left: number };
        switch (pos0) {
            case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;

            case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;

            case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;

            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        if (this.floating) {
            return this.correctPosition(targetElPos, targetElWidth, targetElHeight);
        }

        return targetElPos;
    }

    protected position(nativeEl: HTMLElement): { width: number, height: number, top: number, left: number } {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.getElementOffsetRect(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.getElementOffsetRect(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }
    /**
     * Correct elemenyt position if it goes out of window boundaries
     * 
     * @method correctPosition
     * @param   {Object}    current placement    Object
     * @param   {number}    popover width     number
     * @param   {number}    popover height    number
     * @returns {Object}    corrected placement
     */
    protected correctPosition(currentPlasement: { top: number, left: number }, width, height): { top: number, left: number } {
        const hostElement = this.popover.getElement();
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.getElementOffsetRect(hostElement);
        const hostElementBox = hostElement.getBoundingClientRect();
        if (hostElementBox.left + width / 2 > window.innerWidth) {
            const shift = (hostElementBox.left + width / 2 + 2) - window.innerWidth;
            this._correctionX = shift;
            this.calculateTrianglePlasement();
            return {
                top: currentPlasement.top,
                left: currentPlasement.left - shift
            }
        } else {
            this._correctionX = 0;
            return currentPlasement;
        }
    }
    /**
     * If position of popover was corrected, we need to calculate where to show triangle
     * 
     * @method correctPosition
     * @param   {Object}    current placement    Object
     * @param   {number}    popover width     number
     * @param   {number}    popover height    number
     * @returns {Object}    corrected placement
     */
    protected calculateTrianglePlasement() {
        const elementBox = this.popoverDiv.nativeElement.getBoundingClientRect();
        if (this.popoverArrow) {
            if (this.effectivePlacement == 'top' || this.effectivePlacement == 'bottom') {
                this.renderer.setElementStyle(this.popoverArrow.nativeElement, 'left', this._correctionX > 0 ? elementBox.width / 2 + this._correctionX + 'px' : '50%')
            }
            if (this.effectivePlacement == 'left' || this.effectivePlacement == 'right') {
                this.renderer.setElementStyle(this.popoverArrow.nativeElement, 'top', '50%')
            }
        }
    }

    protected getElementOffsetRect(nativeEl: any): { width: number, height: number, top: number, left: number } {
        var box = nativeEl.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        return {
            width: box.width || nativeEl.offsetWidth,
            height: box.height || nativeEl.offsetHeight,
            top: box.top + (window.pageYOffset || docElem.scrollTop || body.scrollTop),
            left: box.left + (window.pageXOffset || docElem.scrollLeft || body.scrollLeft)
        };
    }

    protected getStyle(nativeEl: HTMLElement, cssProp: string): string {
        if ((nativeEl as any).currentStyle) // IE
            return (nativeEl as any).currentStyle[cssProp];

        if (window.getComputedStyle)
            return (window.getComputedStyle as any)(nativeEl)[cssProp];

        return (nativeEl.style as any)[cssProp];
    }

    protected isStaticPositioned(nativeEl: HTMLElement): boolean {
        return (this.getStyle(nativeEl, "position") || "static") === "static";
    }

    protected parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

    protected getEffectivePlacement(placement: string, hostElement: HTMLElement, targetElement: HTMLElement): string {
        const placementParts = placement.split(" ");

        if (placementParts[0] !== "auto") {
            return placement;
        }

        const hostElBoundingRect = hostElement.getBoundingClientRect();

        const desiredPlacement = placementParts[1] || "bottom";

        if (desiredPlacement === "top" && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return "bottom";
        }
        if (desiredPlacement === "bottom" && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return "top";
        }
        if (desiredPlacement === "left" && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return "right";
        }
        if (desiredPlacement === "right" && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return "left";
        }

        return desiredPlacement;
    }
}