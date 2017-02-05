import {
    Component, Directive, Input, Output,
    TemplateRef, ViewContainerRef, trigger, style, state, transition, ViewChild, keyframes, AnimationTransitionEvent,
    ContentChild, animate
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter, Renderer, ElementRef } from '@angular/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { ApiConfig, ServiceApi } from '../../core';
import { LoaderComponent } from '../../shared';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
                animate('0.2s ease-out', style({ height: '*' }))
            ]),
            transition('expanded => collapsed', [
                animate('0.2s ease-in', style({ height: '0px' }))
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
    @ViewChild('detailsContainer') detailsContainer: ElementRef;
    @ViewChild('content') content: TemplateRef<any>;

    private _expand: boolean = false;
    private _disabled: boolean = false;
    state: string = 'collapsed';
    dialogOpened: boolean = false;

    loading: boolean = false;
    statuses: Array<any> = [];


    constructor(private _renderer: Renderer,
        private _elementRef: ElementRef,
        private _router: Router,
        private modalService: NgbModal,
        private _route: ActivatedRoute,
        private _serviceApi: ServiceApi) {
    }

    @Input() configO: ApiConfig;

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
    toggle() {
        this._setExpand(!this.expand);
        if (this.expand && this.configO && this.configO.errors.length > 0) {
            return;
        }
        if (this.expand && this.configO) {
            this.loading = true;
            this._serviceApi
                .check(this.configO.id)
                .subscribe((statuses) => {
                    this.statuses = statuses;
                    this.loading = false;
                });
        }
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
        console.log('REQUIRE CLOSE POPOVER')
        if (this.dialogOpened) return;
        return this._setExpand(false);
    }

    /**
     * Method to change expand state internally and emit the [onExpanded] event if 'true' or [onCollapsed]
     * event if 'false'. (Blocked if [disabled] is 'true')
     */
    private _setExpand(newExpand: boolean): boolean {
        if (this._disabled) {
            this.expand = false;
        }//
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


    openModal() {
        this.dialogOpened = true;
        const modalRef = this.modalService
            .open(this.content, { windowClass: 'statistic-modal' });

        modalRef.result.then((result) => {
            console.log('DIALOG CLOSING')
            this.dialogOpened = false;
        }, (reason) => {
            console.log('DIALOG CLOSING2')
            setTimeout(() => {
                this.dialogOpened = false;
            },100)

        });
    }
}