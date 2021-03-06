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
import { ApiConfig } from '../../models/ApiConfig';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `ApiConfig` model.
 */
@Injectable()
export class ApiConfigApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) http: Http,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
  ) {
    super(http, auth, searchParams, errorHandler);
  }

  /**
   * Create a new instance of the model and persist it into the data source.
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public create(data: any = undefined) {
    let method: string = "POST";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: ApiConfig) => new ApiConfig(instance));
  }

  /**
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public upsert(data: any = undefined) {
    let method: string = "PUT";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: ApiConfig) => new ApiConfig(instance));
  }

  /**
    * Create a new instance of the model and persist it into the data source.
    *
    * @param object data Request data.
    *
    * This method expects a subset of model properties as request parameters.
    *
    * @returns object An empty reference that will be
    *   populated with the actual data once the response is returned
    *   from the server.
    *
    * <em>
    * (The remote method definition does not provide any description.
    * This usually means the response is a `Cart` object.)
    * </em>
    */
  public updateOrCreate(data: any = {}) {
    let method: string = "PATCH";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: ApiConfig) => new ApiConfig(instance));
  }

  /**
   * Replace an existing model instance or insert a new one into the data source.
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public replaceOrCreate(data: any = undefined) {
    let method: string = "POST";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/replaceOrCreate";
    let routeParams: any = {};
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
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
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public findById(id: any, filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/:id";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: ApiConfig) => new ApiConfig(instance));
  }

  /**
   * Replace attributes for a model instance and persist it into the data source.
   *
   * @param any id Model id
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public replaceById(id: any, data: any = undefined) {
    let method: string = "POST";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/:id/replace";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
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
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public find(filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instances: Array<ApiConfig>) => {
      return instances.map((instance: ApiConfig) => new ApiConfig(instance))
    });
  }


  /**
   *  Search ApiConfigs by filter from the data source.
   *
   * @param object filter Filter defining fields, where, include, order, offset, and limit
   *
   * @returns object[{result: Array<ApiConfig>}, count: number] Object with limited search 
   * result and common count of models in database
   *
   */
  // public search(filter: any = undefined) {
  //   let method: string = "POST";
  //   let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
  //     "/ApiConfigs/search";
  //   let routeParams: any = {};
  //   let postBody: any = {};
  //   let urlParams: any = {};
  //   if (filter) urlParams.filter = filter;
  //   let result = this.request(method, url, routeParams, urlParams, postBody);
  //   return result.map((instances: Array<ApiConfig>) =>
  //     instances.map((instance: ApiConfig) => new ApiConfig(instance))
  //   );
  // }

  /**
   * Find first instance of the model matched by filter from the data source.
   *
   * @param object filter Filter defining fields, where, include, order, offset, and limit
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public findOne(filter: LoopBackFilter = undefined) {
    let method: string = "GET";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/findOne";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (filter) urlParams.filter = filter;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result.map((instance: ApiConfig) => new ApiConfig(instance));
  }

  /**
   * Delete a model instance by {{id}} from the data source.
   *
   * @param any id Model id
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public deleteById(id: any) {
    let method: string = "DELETE";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/:id";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {};
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Count instances of the model matched by where from the data source.
   *
   * @param object where Criteria to match model instances
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` - 
   */
  // public count(filter: LoopBackFilter = undefined) {
  //   let method: string = "GET";
  //   let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
  //     "/ApiConfigs/count";
  //   let routeParams: any = {};
  //   let postBody: any = {};
  //   let urlParams: any = {};
  //   if (filter) urlParams.filter = filter;
  //   let result = this.request(method, url, routeParams, urlParams, postBody);
  //   return result;
  // }
  public count(where: any = undefined) {
    let method: string = "GET";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/count";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (where) urlParams.where = where;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param any id PersistedModel id
   *
   * @param object data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ApiConfig` object.)
   * </em>
   */
  public updateAttributes(id: any, data: any = undefined) {
    let method: string = "PUT";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/:id";
    let routeParams: any = {
      id: id
    };
    let postBody: any = {
      data: data
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }


  public testApiConfig(methodToTest, plugins, headers, params, body?) {
    let method: string = "POST";
    let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
      "/ApiConfigs/test";
    let routeParams: any = {};
    let postBody: any = {
      data: { method: methodToTest, plugins, headers, params, body }
    };
    let urlParams: any = {};
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }
}
