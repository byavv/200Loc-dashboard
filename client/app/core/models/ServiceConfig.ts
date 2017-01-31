/* tslint:disable */

export interface ServiceConfigInterface {
  name?: string;
  description?: string;
  settings?: any;
  serviceId?: string;
  id?: number;
}

export class ServiceConfig implements ServiceConfigInterface {
  name?: string;
  description?: string;
  settings?: any;
  serviceId?: string;
  id?: number;
  constructor(instance?: ServiceConfig) {
    Object.assign(this, instance);
  }
}
