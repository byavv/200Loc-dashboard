/* tslint:disable */
import { Injectable } from '@angular/core';
import { StorageDriver } from '../utils/storage.driver';
import { Subject, Observable } from 'rxjs';
import { User, IUser } from '../models';
import { Store } from '@ngrx/store';
import { AppState, getAuthenticationState } from '../reducers';
import { UserActions } from '../actions';

@Injectable()
export class LoopBackAuth {
  private _user: User;

  protected prefix: string = '$__loc__$';
  constructor(
    private _store: Store<AppState>, private _userActions: UserActions) {
    this._user = new User(this.loadUser());
    this._store
      .let(getAuthenticationState())
      .subscribe(state => {
        if (state.user && state.user.accessToken)
          this._user = new User(state.user);
      })
  }

  public populate() {
    console.log(this._user)
    if (this._user.accessToken) {
      this._store.dispatch(this._userActions.login(this._user));
    }
  }

  get user() {
    return this._user;
  }

  public clearStorage() {
    StorageDriver.remove(this.prefix + 'accessToken');
    StorageDriver.remove(this.prefix + 'username');
  };

  public persist(userData: IUser) {
    if (typeof userData === 'object') {
      Object.keys(userData).forEach((key) => {
        this._persist(key, userData[key]);
      });
    }
  }

  private _persist(propName: string, value: any) {
    try {
      if (typeof value === 'string') {
        StorageDriver.set(
          `${this.prefix}${propName}`, value
        );
      } else if (typeof value === 'object') {
        StorageDriver.set(
          `${this.prefix}${propName}`, JSON.stringify(value)
        );
      } else {
        throw 'Data has wrong format';
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  protected loadUser(): IUser {
    let userData: IUser = {};
    userData.accessToken = this._load('accessToken')
    userData.username = this._load('username');
    return userData;
  }

  private _load(name: string): any {
    var key = this.prefix + name;
    return StorageDriver.get(key);
  }
}