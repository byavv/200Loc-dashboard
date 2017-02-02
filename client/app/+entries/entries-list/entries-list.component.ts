import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AppController } from '../../shared/services';
import { LoaderComponent } from '../../shared/components';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ApiConfigApi, ApiConfig, ServiceApi, ServiceStatus } from '../../core'
import { FormControl } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'api-list',
  templateUrl: './entries-list.component.tmpl.html'
})
export class EntriesListComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(NgbPagination) pager: NgbPagination;

  configs: Array<any> = [];
  loading: boolean = false;
  sidebarActive: boolean = false;
  serviceStatusArray: Array<ServiceStatus> = [];
  

  count: number;
  searchParams: any = {};
  maxItems: number = 6;

  searchQuery: string;
  searchControl: FormControl = new FormControl();

  constructor(private appController: AppController,
    private router: Router,
    private route: ActivatedRoute,
    private _serviceApi: ServiceApi,
    private _ngZone: NgZone,
    private _apiConfigApi: ApiConfigApi) { }

  ngOnInit() {
    this.searchParams = { name: this.route.snapshot.queryParams['name'] || '', page: +this.route.snapshot.queryParams['page'] || 1 }
    this.route.queryParams
      .do((qParams) => { this.loading = true })
      .map((qParams: any) => {
        let q: any = {
          limit: this.maxItems,
          skip: +qParams.page && +qParams.page > 0 ? this.maxItems * (+qParams.page - 1) : 0
        }
        if (qParams && qParams.name && qParams.name.trim) {
          q.where = { name: { regexp: `/^${qParams.name.trim()}/i` } }
        }
        return q;
      })
      .switchMap((query: any) => this._doSearchQuery(query))
      .subscribe((result: any) => {
        this.configs = result.configs;
        this.count = result.count;
        this.loading = false;
        this.pager.collectionSize = this.count;
        this.pager.selectPage(this.searchParams.page || 1);
      }, (err) => {
        console.error(err);
        this.loading = false;
      });
  }

  _doSearchQuery(query) {
    return Observable.zip(
      this._apiConfigApi.find(query),
      this._apiConfigApi.count(!!query.where ? query.where : {}),
      this._serviceApi.check()
      , (configs: any, conuntResult: any, checkResult: any) => {
        this.serviceStatusArray = checkResult;
        this.configs = configs.map(c => this.setStatus(c));
        return {
          configs: configs,
          count: conuntResult.count,
          serviceStatus: checkResult
        }
      });
  }

  ngAfterViewInit() {
    Observable
      .merge(
      // search input
      this.searchControl
        .valueChanges
        .distinctUntilChanged()
        .debounceTime(500)
        .map((value) => { return { name: value } }),
      // pager
      this.pager ? this.pager
        .pageChange
        .distinctUntilChanged()
        .map((value) => { return { page: value } })
        : Observable.of({})
      )
      .subscribe(req => {     
        this.doSearch(req);
      });
  }

  doSearch(q: { name?: string, page?: number }) {
    const req = Object.assign(this.searchParams, q)
    this.router.navigate(['/entries'], { queryParams: req });
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
    const messages = new Array<ServiceStatus>();

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
