/* tslint:disable */
export * from './ApiConfig';
export * from './DriverConfig';
export * from './UserApi';

import { ApiConfigApi } from './ApiConfig';
import { DriverConfigApi } from './DriverConfig';
import { UserApi } from './UserApi';

export const CUSTOM_SERVICES = [
    ApiConfigApi,
    DriverConfigApi,
    UserApi
]