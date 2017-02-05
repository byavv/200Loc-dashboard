import { EntriesWizardBaseComponent } from './entries-wizard-base';
import { EntriesListComponent } from './entries-list';
import { EntriesBaseComponent } from './entries-base';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from '../core';
import { StatusResolver } from './shared'

export const routes: Routes = [
  {
    path: '',
    component: EntriesBaseComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: 'master',
        component: EntriesWizardBaseComponent
      },
      {
        path: '',
        component: EntriesListComponent,
        // children: [
        //   {
        //     path: 'statistic/:id',
        //     loadChildren: '../+services/+services-statistic/services-statistic.module#ServicesStatisticModule',
        //     resolve: {
        //       status: StatusResolver
        //     }
        //   }
        // ]
      },
      // This way is not working: https://github.com/angular/angular/issues/10981
      // {
      //   path: 'service/:id',      
      //   loadChildren: '../+services/+services-statistic/services-statistic.module#ServicesStatisticModule',
      //   outlet: 'statistic'
      // }

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule { }

/*

  { path: '', component: SpeakersListComponent, outlet: 'list' },
    { path: ':id', component: BioComponent, outlet: 'bio' }
 { path: 'speakersList', component: SpeakersListComponent, outlet: 'list' },
    { path: ':id', component: BioComponent, outlet: 'bio' }
 */