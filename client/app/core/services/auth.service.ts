/* tslint:disable */
import { Injectable } from '@angular/core';
import { StorageDriver } from '../utils/storage.driver';
import { Subject, Observable } from 'rxjs';
import { User, IUser } from '../models';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { UserActions } from '../actions';

@Injectable()
export class LoopBackAuth {
  private _user: User;

  protected prefix: string = '$__loc__$';
  constructor(
    private _store: Store<AppState>, private _userActions: UserActions) {
    this._user = new User(this.loadUser());
  }

  public populate() {
    if (this._user.accessToken) {
      this._store.dispatch(this._userActions.login(this._user));
    }
  }

  get user() {
    return this._user;
  }

  public save() {
    this._persist("accessToken", this._user.accessToken);
  };

  public clearStorage() {
    StorageDriver.remove(this.prefix + 'accessToken');
  };

  protected persistUser(userData: User) {
    if (typeof userData === 'object') {
      Object.keys(userData).forEach((key) => {
        this._persist(`${this.prefix}${key}`, userData[key]);
      })
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