import { AuthenticationRoutes } from './authentication/routes';
import { PluginsRoutes } from './plugin-manager/routes';
import { DriverManagerRoutes } from './driver-manager/routes';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
import { NotFoundComponent } from './components/notFound/notFound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'entries', pathMatch: 'full' },
    { path: 'entries', loadChildren: './+entries/entries.module#EntriesModule' },
    { path: 'drivers', loadChildren: './+drivers/drivers.module#DriversModule' },   
    ...AuthenticationRoutes 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }