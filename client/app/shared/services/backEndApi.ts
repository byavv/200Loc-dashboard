import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Request } from '@angular/http';
import { LoopBackConfig } from "../../app.config"
@Injectable()
export class BackEnd {

  constructor(private _http: Http) { }

  public getPlugins(): Observable<any> {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/plugins")
      .map(res => res.json());
  }
  public getApiConfigs(): Observable<any> {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/configs")
      .map(res => res.json());
  }

  public getAvailableDrivers(): Observable<any> {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/drivers")
      .map(res => res.json());
  }
  public getDriverConfigurations(name): Observable<any> {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/drivers/${name}`)
      .map(res => res.json());
  }

  public getDriverTemplateByName(name): Observable<any> {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/driver/config/${name}`)
      .map(res => res.json());
  }

  public getConfig(id): Observable<any> {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/config/${id}`)
      .map(res => res.json());
  }

  public createOrUpdate(data: any, id?: string) {
    return this._http
      .post(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/config/${id}`, JSON.stringify(data))
      .map(res => res.json());
  }

  public createOrUpdateDriver(driver: any) {
    return this._http
      .post(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/driver/${driver.id ? driver.id : ''}`, JSON.stringify(driver))
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
      url: LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + "/test"
    });
    return this._http
      .request(new Request(options))
      .map(res => res.json());
  }

  public deleteApiConfig(id) {
    return this._http
      .delete(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/config/${id}`)
      .map(res => res.json());
  }
  public getDriverConfig(id) {
    return this._http
      .get(LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() + `/driver/${id}`)
      .map(res => res.json());
  }
}
