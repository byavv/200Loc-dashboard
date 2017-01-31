import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate } from '@angular/core';
import { AppController } from '../../shared/services';
import { LoaderComponent } from '../../shared/components';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ApiConfigApi, ApiConfig, ServiceApi, ServiceStatus } from '../../core'

@Component({
  selector: 'api-list',
  templateUrl: './entries-list.component.tmpl.html'  
})
export class EntriesListComponent implements OnInit, OnDestroy {
  configs: Array<any> = [];
  loading: boolean = false;
  sidebarActive: boolean = false;
  serviceStatusArray: Array<ServiceStatus> = [];

  constructor(private appController: AppController,
    private router: Router,
    private route: ActivatedRoute,
    private _serviceApi: ServiceApi,
    private _apiConfigApi: ApiConfigApi) { }

  ngOnInit() {
    this.loading = true;
    Observable.forkJoin(this._apiConfigApi.find(), this._serviceApi.check())
      .subscribe((result: Array<any>) => {
        this.configs = result[0];
        this.serviceStatusArray = result[1];
        this.configs = this.configs.map(c => this.setStatus(c))
        this.loading = false;
      });
  }

  ngOnDestroy() { }

  onRemove(config) {
    this._apiConfigApi
      .deleteById(config.id)
      .subscribe(res => {
        let ind = this.configs.indexOf(config);
        this.configs.splice(ind, 1);
      });
  }

  setStatus(config: ApiConfig) {
    let ok = true;
    const messages = new Array<ServiceStatus>()

    config.plugins.forEach(pl => {
      if (pl.dependencies) {
        Object.keys(pl.dependencies).forEach(key => {
          const st = this.serviceStatusArray.find(s => s.id == pl.dependencies[key]);
          if (st) {
            if (ok && st.error) {
              ok = false;
            }
            messages.push(st);
          }
        });
      }
    });

    return Object.assign(config, {
      class: ok ? 'green' : 'red',
      messages: messages
    })
  }

  editApi(config) {
    this.router.navigate(['./master'], { queryParams: { id: config.id }, relativeTo: this.route })
  }

  toggleActive(config, value) {
    this.loading = true;
    this._apiConfigApi.patchOrCreate(Object.assign({}, config, {
      active: value,
      loaded: null,
      status: null
    }))
      .subscribe((result) => {
        this.loading = false;
      }, (err) => {
        // notify
        console.error(err);
      });

  }

  onAddClick() {
    this.router.navigate(['./master'], { relativeTo: this.route });
  }

  getConfigMethodsString(config: ApiConfig) {
    return (config.methods || []).join(', ');
  }

  getGroupsApplied() {
    return '-';
  }

  showSideMenu(config) {
    this.sidebarActive = true;
  }
}
