import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServiceApi, ServiceStatus } from '../../../core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatusResolver implements Resolve<ServiceStatus> {
    constructor(private _serviceApi: ServiceApi) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {        
        return this._serviceApi.summary(route.params['id'])
    }
}