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
import { Plugin } from '../../models/Plugin';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `Plugin` model.
 */
@Injectable()
export class PluginApi extends BaseLoopBackApi {

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
     * This usually means the response is a `Plugin` object.)
     * </em>
     */
    public findById(id: any, filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/Plugins/:id";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instance: Plugin) => new Plugin(instance));
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
     * This usually means the response is a `Plugin` object.)
     * </em>
     */
    public find(filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/Plugins";
        let routeParams: any = {};
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instances: Array<Plugin>) =>
            instances.map((instance: Plugin) => new Plugin(instance))
        );
    }
}