import { Directive, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../core';
import { isUserLoggedIn, AppState } from '../../core/reducers';
import { Subscription } from 'rxjs';

/**
 * Usage: <div *locAuthOnly>...</div>
 */
@Directive({
    selector: '[locAuthOnly]'
})
export class HideForNotLoggedDirective implements OnInit, OnDestroy {
    private _subscr: Subscription;
    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _store: Store<AppState>) { }

    ngOnInit() {
        this._subscr = this._store
            .let(isUserLoggedIn())
            .subscribe((state: boolean) => {
                if (state) {
                    this._viewContainer.clear();
                    this._viewContainer.createEmbeddedView(this._templateRef);
                } else {
                    this._viewContainer.clear();
                }
            }, (err) => { });
    }
    ngOnDestroy() {
        this._subscr.unsubscribe();
    }
}