/* tslint:disable */
export * from './auth.service';
export * from './error.service';
export * from './search.params';
export * from './base.service';

export * from './custom';

import { LoopBackAuth } from './auth.service';
import { ErrorHandler } from './error.service';
import { JSONSearchParams } from './search.params';

import { CUSTOM_SERVICES } from './custom';

export const CORE_SERVICES = [
    LoopBackAuth,
    ErrorHandler,
    JSONSearchParams,
    ...CUSTOM_SERVICES
]
