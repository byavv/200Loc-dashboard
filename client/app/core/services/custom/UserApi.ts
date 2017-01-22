/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CoreConfig } from '../../core.config';
import { LoopBackFilter } from '../../models/BaseModels';
import { LoopBackAuth } from '../auth.service';
import { BaseLoopBackApi } from '../base.service';
import { JSONSearchParams } from '../search.params';
import { ErrorHandler } from '../error.service';
import { User } from '../../models';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `User` model.
 */
@Injectable()
export class UserApi extends BaseLoopBackApi {

    constructor(
        @Inject(Http) http: Http,
        @Inject(LoopBackAuth) protected auth: LoopBackAuth,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
    ) {
        super(http, auth, searchParams, errorHandler);
    }

    /**
     * Find a related item by id for accessTokens.
     *
     * @param any id User id
     *
     * @param any fk Foreign key for accessTokens
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    public findByIdAccessTokens(id: any, fk: any) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/:id/accesstokens/:fk";
        let routeParams: any = {
            id: id,
            fk: fk
        };
        let postBody: any = {};
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instance: User) => new User(instance));
    }

    /**
     * Delete a related item by id for accessTokens.
     *
     * @param any id User id
     *
     * @param any fk Foreign key for accessTokens
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    public destroyByIdAccessTokens(id: any, fk: any) {
        let method: string = "DELETE";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/:id/accesstokens/:fk";
        let routeParams: any = {
            id: id,
            fk: fk
        };
        let postBody: any = {};
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * Update a related item by id for accessTokens.
     *
     * @param any id User id
     *
     * @param any fk Foreign key for accessTokens
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public updateByIdAccessTokens(id: any, fk: any, data: any = undefined) {
        let method: string = "PUT";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/:id/accesstokens/:fk";
        let routeParams: any = {
            id: id,
            fk: fk
        };
        let postBody: any = {
            data: data
        };
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * Queries accessTokens of User.
     *
     * @param any id User id
     *
     * @param object filter 
     *
     * @returns object[] An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    public getAccessTokens(id: any, filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/:id/accesstokens";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * Creates a new instance in accessTokens of this model.
     *
     * @param any id User id
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public createAccessTokens(id: any, data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/:id/accesstokens";
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
     * Deletes all accessTokens of this model.
     *
     * @param any id User id
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    public deleteAccessTokens(id: any) {
        let method: string = "DELETE";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/:id/accesstokens";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * Counts accessTokens of User.
     *
     * @param any id User id
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
    public countAccessTokens(id: any, where: any = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/:id/accesstokens/count";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        if (where) urlParams.where = where;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public create(data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users";
        let routeParams: any = {};
        let postBody: any = {
            data: data
        };
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instance: User) => new User(instance));
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public patchOrCreate(data: any = undefined) {
        let method: string = "PATCH";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users";
        let routeParams: any = {};
        let postBody: any = {
            data: data
        };
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
    * <em>
          * (The remote method definition does not provide any description.)
          * </em>
    *
    * @param string userId 
    *
    * @returns object An empty reference that will be
    *   populated with the actual data once the response is returned
    *   from the server.
    *
    * <em>
    * (The remote method definition does not provide any description.
    * This usually means the response is a `User` object.)
    * </em>
    */
    public getUserByPrinciple(userId: any = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/getuser";
        let routeParams: any = {};
        let postBody: any = {};
        let urlParams: any = {};
        if (userId) urlParams.userId = userId;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param object data Request data.
     *
     *  - `userId` – `{string}` - 
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    public deleteUser(userId: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/deleteuserandprofile";
        let routeParams: any = {};
        let postBody: any = {
            userId: userId
        };
        let urlParams: any = {};
        if (userId) urlParams.userId = userId;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param object data Request data.
     *
     *  - `userId` – `{string}` - 
     *
     *  - `data` – `{object}` - 
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    public updatePassword(data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/updatepassword";
        let routeParams: any = {};
        let postBody: any = data;
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param object data Request data.
     *
     *  - `userId` – `{string}` - 
     *
     *  - `data` – `{object}` - 
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    public updateAccount(data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + CoreConfig.getApiVersion() + "/private" +
            "/users/updateaccount";
        let routeParams: any = {};
        let postBody: any = data;
        let result = this.request(method, url, routeParams, {}, postBody);
        return result;
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public replaceOrCreate(data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/replaceorcreate";
        let routeParams: any = {};
        let postBody: any = {
            data: data
        };
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * Check whether a model instance exists in the data source.
     *
     * @param any id Model id
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `exists` – `{boolean}` - 
     */
    public exists(id: any) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/:id/exists";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }

    /**
     * Find a model instance by id from the data source.
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public findById(id: any, filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/:id";
        let routeParams: any = {
            id: id
        };
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instance: User) => new User(instance));
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public replaceById(id: any, data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/:id/replace";
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    public find(filter: LoopBackFilter = undefined) {
        let method: string = "GET";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users";
        let routeParams: any = {};
        let postBody: any = {};
        let urlParams: any = {};
        if (filter) urlParams.filter = filter;
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result.map((instances: Array<User>) =>
            instances.map((instance: User) => new User(instance))
        );
    }



    /**
     * Login a user with username/email and password.
     *
     * @param string include Related objects to include in the response. See the description of return value for more details.
     *   Default value: `user`.
     *
     *  - `rememberMe` - `boolean` - Whether the authentication credentials
     *     should be remembered in localStorage across app/browser restarts.
     *     Default: `true`.
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * The response body contains properties of the AccessToken created on login.
     * Depending on the value of `include` parameter, the body may contain additional properties:
     * 
     *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
     * 
     *
     */

    public login(credentials: any, include: any = 'user') {
        let method: string = "POST";
        // let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
        //     "/login";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/login";

        let routeParams: any = {};
        let postBody: any = {
            data: credentials
        };
        let urlParams: any = {};
        if (include) urlParams.include = include;
        let result = this.request(method, url, routeParams, urlParams, postBody)
            .share();
        result.subscribe(
            (response: { id: string, userId: string, user: any }) => {
                this.auth.persist({ accessToken: response.id, username: response.user.username });
            },
            (err) => { console.error(err) }
        );
        return result;
    }

    /**
     * Change default user username/password
     *
     * @param string include Related objects to include in the response. See the description of return value for more details.
     *   Default value: `user`.
     *
     *  - `rememberMe` - `boolean` - Whether the authentication credentials
     *     should be remembered in localStorage across app/browser restarts.
     *     Default: `true`.
     *
     * @param object data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * The response body contains properties of the AccessToken created on login.
     * Depending on the value of `include` parameter, the body may contain additional properties:
     * 
     *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
     * 
     *
     */
    public change(credentials: any) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/change";

        let routeParams: any = {};
        let postBody: any = {
            data: credentials
        };
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }


    /**
     * 
     * Create new user with username/email and password.
     *
     *
     * @param object data Request data.
     *
     *  - `data` – `{object}` - 
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    public signup(data: any = undefined) {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/signup";
        let routeParams: any = {};
        let postBody: any = {
            data: data
        };
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }


    /**
     * Logout a user with access token.
     *
     * @param object data Request data.
     *
     *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    public logout() {
        let method: string = "POST";
        let url: string = CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() +
            "/users/logout";
        let routeParams: any = {};
        let postBody: any = {};
        let urlParams: any = {};
        let result = this.request(method, url, routeParams, urlParams, postBody);
        return result;
    }
}