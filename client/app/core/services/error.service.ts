/* tslint:disable */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot } from '@angular/router';
import { LoopBackAuth } from './auth.service';
import { AppState } from '../reducers';
import { UserActions } from '../actions';
import { Store } from '@ngrx/store';

/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private auth: LoopBackAuth,
    private _store: Store<AppState>,
    private _userActions: UserActions) { }

  public handleError(error: Response): ErrorObservable<any> {
    if (error.status == 401) {
      this._store.dispatch(this._userActions.logout());
      this.auth.clearStorage();
      const state: RouterState = this._router.routerState;
      const snapshot: RouterStateSnapshot = state.snapshot;
      this._router.navigate(['auth'], { queryParams: { from: snapshot.url } });
    }
    return Observable.throw(error.json().error || 'Server error');
  }
}
