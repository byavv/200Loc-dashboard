/* tslint:disable */
import { Plugin } from './Plugin';
import { ServiceStatus } from './ServiceStatus';

export interface ApiConfigInterface {
  name: string;
  public: boolean;
  description?: string;
  entry: string;
  methods: Array<string>;
  plugins?: Array<Plugin>;
  id?: any;
  ok?: any;
  errors?: Array<any>; 
}

export class ApiConfig implements ApiConfigInterface {
  name: string;
  public: boolean;
  description: string;
  entry: string;
  methods: Array<string> = ["GET", "POST"];
  plugins: Array<Plugin> = [];
  id: any;
  ok: any;
  errors: Array<any> = [];  

  constructor(instance?: ApiConfig) {
    Object.assign(this, instance);
  }
}
