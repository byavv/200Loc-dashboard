import { Routes } from '@angular/router';
import {
    DriverManagerBaseComponent,
    DriverManagerConfigComponent,
    DriverTypesComponent
} from './components';

export const DriverManagerRoutes: Routes = [
    {
        path: 'drivers',
        component: DriverManagerBaseComponent,
        children: [
            {
                path: 'config',
                component: DriverManagerConfigComponent
            },
            {
                path: '',
                component: DriverTypesComponent
            }
        ]
    }
];
