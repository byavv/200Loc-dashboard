/* tslint:disable */
export * from './ApiConfig';
export * from './ServiceConfig';
export * from './UserApi';
export * from './PluginsApi.service';
export * from './ServiceApi.service';

import { ApiConfigApi } from './ApiConfig';
import { ServiceConfigApi } from './ServiceConfig';
import { UserApi } from './UserApi';
import { PluginApi } from './PluginsApi.service';
import { ServiceApi } from './ServiceApi.service';

export const CUSTOM_SERVICES = [
    ApiConfigApi,
    ServiceConfigApi,
    UserApi,
    PluginApi,
    ServiceApi
]