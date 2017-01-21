export * from './apiMaster.component'
export * from './apiManager.component'
export * from './apiList.component'

import { ApiManagementComponent } from './apiManager.component';
import { ApiListComponent } from './apiList.component';
import { ApiMasterComponent } from './apiMaster.component';

import { MASTER_STEPS_COMPONENTS } from './steps';

export const ENTRIES_COMPONENTS = [
    ApiManagementComponent,
    ApiListComponent,
    ApiMasterComponent,
    ...MASTER_STEPS_COMPONENTS
]