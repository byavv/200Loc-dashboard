import { Routes } from '@angular/router';
import { PluginsDetailComponent, PluginsBaseComponent, PluginsListComponent } from './components';

export const PluginsRoutes: Routes = [
  {
    path: 'plugins',
    component: PluginsBaseComponent,
  }
];
