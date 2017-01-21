import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Request } from '@angular/http';
import { CoreConfig } from "../../core";
@Injectable()
export class CustomBackEndApi {

  constructor(private _http: Http) { }

  public getPlugins(): Observable<any> {
    return this._http
      .get(CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() + "/plugins")
      .map(res => res.json());
  }

  public testApiConfig(method, plugins, headers, params, body?) {
    let reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'application/json');

    let reqBody = JSON.stringify({ method, plugins, headers, params, body });
    let options = new RequestOptions({
      headers: reqHeaders,
      method: 'post',
      body: reqBody,
      url: CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() + "/test"
    });
    return this._http
      .request(new Request(options))
      .map(res => res.json());
  }

  public getAvailableDrivers(): Observable<any> {
    return this._http
      .get(CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() + "/drivers")
      .map(res => res.json());
  }

  public getDriverTemplateByName(name): Observable<any> {
    return this._http
      .get(CoreConfig.getPath() + "/" + CoreConfig.getApiVersion() + `/driver/config/${name}`)
      .map(res => res.json());
  }
}
