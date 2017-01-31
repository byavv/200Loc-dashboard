import { AuthenticationRoutes } from './authentication/routes';
import { PluginsRoutes } from './plugin-manager/routes';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
//import { NotFoundComponent } from './components/notFound/notFound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'entries', pathMatch: 'full' },
    { path: 'entries', loadChildren: './+entries/entries.module#EntriesModule' },
    { path: 'services', loadChildren: './+services/services.module#ServicesModule' },
    ...AuthenticationRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }