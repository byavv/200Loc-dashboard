import { Routes } from '@angular/router';
import { ApiManagerRoutes } from './api-manager/routes';
import { AuthenticationRoutes } from './authentication/routes';
import { PluginsRoutes } from './plugin-manager/routes';
import { DriverManagerRoutes } from './driver-manager/routes';

export const routes: Routes = [
    ...PluginsRoutes,
    ...ApiManagerRoutes,
    ...AuthenticationRoutes,
    ...DriverManagerRoutes
];
