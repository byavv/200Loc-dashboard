import {
    Component, Directive, Input, Output,
    TemplateRef, ViewContainerRef, trigger, style, state, transition, ViewChild, keyframes,
    ContentChild, animate
} from '@angular/core';
import { EventEmitter, Renderer, ElementRef } from '@angular/core';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
    selector: 'entries-details',
    styleUrls: ['./entries-list-details.component.scss'],
    templateUrl: './entries-list-details.component.tmpl.html',
    animations: [
        trigger('detailsCollapse', [
            state('expanded', style({
                height: '*'            
            })),
            state('collapsed', style({
                height: '0px'               
            })),  
            transition('collapsed => expanded', [            
                animate(200, style({ height: '*' }))
            ]),
            transition('expanded => collapsed', [               
                animate(200, style({ height: '0px' }))
            ])
        ]),       
        trigger('headerCollapse', [
            state('expanded', style({
                background: '#fafafa'
            })),
            state('collapsed', style({
                background: '#fff'
            })),
            transition('* => *', animate('250ms linear'))
        ])
    ]  
})
export class EntriesDetailsComponent {
    @ViewChild('panel') container: ElementRef;

    private _expand: boolean = false;
    private _disabled: boolean = false;
    state: string = 'collapsed';

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) {    
        this.close = this.close.bind(this); 
    }

    /**
     * label?: string
     * Sets label of [TdExpansionPanelComponent] header.
     * Defaults to 'Click to expand'
     */
    @Input() label: string;

    /**
     * sublabel?: string
     * Sets sublabel of [TdExpansionPanelComponent] header.
     */
    @Input() sublabel: string;


    set expand(value: boolean) {
        this._expand = value;
        this.state = value ? 'expanded' : 'collapsed';
   // this.orderedState = `${this.state} ${this.orderedState}`
        console.log(this.state)
    };
    get expand(): boolean {
        return this._expand;
    };

    /**
     * disabled?: boolean
     * Disables icon and header, blocks click event and sets [TdStepComponent] to deactive if 'true'.
     */
    @Input('disabled')
    set disabled(disabled: boolean) {
        if (disabled && this._expand) {
            this._expand = false;
            this._onCollapsed();
        }
        this._disabled = disabled;
    };
    get disabled(): boolean {
        return this._disabled;
    };

    /**
     * expanded?: function
     * Event emitted when [TdExpansionPanelComponent] is expanded.
     */
    @Output() expanded: EventEmitter<void> = new EventEmitter<void>();

    /**
     * collapsed?: function
     * Event emitted when [TdExpansionPanelComponent] is collapsed.
     */
    @Output() collapsed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Method executed when [TdExpansionPanelComponent] is clicked.
     */
    clickEvent(): void {
        this._setExpand(!this.expand);
    };

    /**
     * Toggle expand state of [TdExpansionPanelComponent]
     * retuns 'true' if successful, else 'false'.
     */
    toggle(): boolean {       
        return this._setExpand(!this.expand);
    }

    /**
     * Opens [TdExpansionPanelComponent]
     * retuns 'true' if successful, else 'false'.
     */
    open(): boolean {
        return this._setExpand(true);
    }

    /**
     * Closes [TdExpansionPanelComponent]
     * retuns 'true' if successful, else 'false'.
     */
    close(): boolean {
        return this._setExpand(false);
    }

    /**
     * Method to change expand state internally and emit the [onExpanded] event if 'true' or [onCollapsed]
     * event if 'false'. (Blocked if [disabled] is 'true')
     */
    private _setExpand(newExpand: boolean): boolean {
        if (this._disabled) {
            this.expand = false;
        }
        if (this.expand !== newExpand) {
            this.expand = newExpand;
            if (newExpand) {
                this._onExpanded();
            } else {
                this._onCollapsed();
            }

            return true;
        }
        return false;
    };

    private _onExpanded(): void {
        this.expanded.emit(undefined);
    };

    private _onCollapsed(): void {
        this.collapsed.emit(undefined);
    };
}