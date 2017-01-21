import { CustomBackEndApi } from './backEndApi';
import { AppController } from './appController';

export * from './backEndApi';
export * from './appController';

export var SHARED_SERVICES: Array<any> = [
    CustomBackEndApi,
    AppController
];
