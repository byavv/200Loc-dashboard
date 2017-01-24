/* tslint:disable */
export * from './ApiConfig';
export * from './DriverConfig';
export * from './UserApi';
export * from './PluginsApi.service';
export * from './DriverApi.service';

import { ApiConfigApi } from './ApiConfig';
import { DriverConfigApi } from './DriverConfig';
import { UserApi } from './UserApi';
import { PluginApi } from './PluginsApi.service';
import { DriverApi } from './DriverApi.service';

export const CUSTOM_SERVICES = [
    ApiConfigApi,
    DriverConfigApi,
    UserApi,
    PluginApi,
    DriverApi
]