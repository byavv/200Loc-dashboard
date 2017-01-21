/* tslint:disable */
/**
* @module CoreConfig
* @description
*
* The CoreConfig module for global configuration perposes
*
* Example
*
* import { CoreConfig } from './core';
* 
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     CoreConfig.setBaseURL('http://localhost:3000');
*     CoreConfig.setApiVersion('api');
*   }
* }
**/
export class CoreConfig {
  private static path: string = '';
  private static version: string | number = 'api';
  private static authPrefix: string = '';
  private static debug: boolean = true;

  public static setApiVersion(version: string = 'api'): void {
    CoreConfig.version = version;
  }

  public static getApiVersion(): string | number {
    return CoreConfig.version;
  }

  public static setBaseURL(url: string = '/'): void {
    CoreConfig.path = url;
  }

  public static getPath(): string {
    return CoreConfig.path;
  }

  public static setAuthPrefix(authPrefix: string = ''): void {
    CoreConfig.authPrefix = authPrefix;
  }

  public static getAuthPrefix(): string {
    return CoreConfig.authPrefix;
  }

  public static setDebugMode(isEnabled: boolean): void {
    CoreConfig.debug = isEnabled;
  }

  public static debuggable(): boolean {
    return CoreConfig.debug;
  }
}
