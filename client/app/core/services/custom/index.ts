/* tslint:disable */
export * from './ApiConfig';
export * from './DriverConfig';

import { ApiConfigApi } from './ApiConfig';
import { DriverConfigApi } from './DriverConfig';

export const CUSTOM_SERVICES = [
    ApiConfigApi,
    DriverConfigApi
]