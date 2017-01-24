/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseLoopBackApi } from '../base.service';
import { CoreConfig } from '../../core.config';
import { LoopBackAuth } from '../auth.service';
import { LoopBackFilter } from '../../models/BaseModels';
import { JSONSearchParams } from '../search.params';
import { ErrorHandler } from '../error.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Driver } from '../../models/Driver';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `Driver` model.
 */
@Injectable()
export class DriverApi extends BaseLoopBackApi {

    constructor(
        @Inject(Http) http: Http,
        @Inject(LoopBackAuth) protected auth: LoopBackAuth,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
    ) {
        super(http, auth, searchParams, errorHandler);
    }

    /**
     * Find a model instance by {{id}} from the data source.
     *
     * @param any id Model id
     *
     * @param object filter Filter defining fields and include
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Driver` object.)
     * </em>
     */
    public findById(id: any, filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/Drivers/:id";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instance: Driver) => new Driver(instance));
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     *
     * @param object filter Filter defining fields, where, include, order, offset, and limit
     *
     * @returns object[] An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Driver` object.)
     * </em>
     */
    public find(filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/Drivers";
        let routeParams: any = {};
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instances: Array<Driver>) =>
            instances.map((instance: Driver) => new Driver(instance))
        );
    }
    /**
     * Get template object for driver by it's uniq name
     *
     * @param string name Driver name
     *
     * @returns object And object reprents driver required configuration
     * with populated settings field which consists of required options to br set for 
     * driver's proper configuration
     *    
     */
    public getDriverTemplateByName(name: string) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/Drivers/template/:name";
        let routeParams: any = {
            name: name
        };
        let postBody: any = {};
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }
}
