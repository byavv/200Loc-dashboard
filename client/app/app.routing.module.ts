import { AuthenticationRoutes } from './auth';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';
import { NotFoundComponent } from './notFound';

export const routes: Routes = [
    { path: '', redirectTo: 'entries', pathMatch: 'full' },
    { path: 'entries', loadChildren: './+entries/entries.module#EntriesModule' },
    { path: 'services', loadChildren: './+services/services.module#ServicesModule' },
    ...AuthenticationRoutes,

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }