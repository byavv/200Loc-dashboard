import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AppController } from '../../shared/services';
import { LoaderComponent, LocPagerComponent } from '../../shared/components';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ApiConfigApi, ApiConfig, ServiceApi, ServiceStatus } from '../../core'
import { FormControl } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap'
import { PagerComponent } from 'ng2-bootstrap'

interface IQuery {
  name?: string;
  page?: number;
}

@Component({
  selector: 'api-list',
  templateUrl: './entries-list.component.tmpl.html',
  animations: [
    trigger('initial', [
      state('start', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('complete', style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('start => complete', [
        animate('300ms linear')
      ])
    ])
  ]
})
export class EntriesListComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(PagerComponent) pager: PagerComponent;

  @ViewChild(LocPagerComponent) locPager: LocPagerComponent;

  configs: Array<any> = [];
  loading: boolean = false;
  sidebarActive: boolean = false;
  serviceStatusArray: Array<ServiceStatus> = [];
  initialComplete: boolean = false;
  state: string = 'start';
  count: number;
  searchParams: IQuery = {};
  maxItems: number = 10;

  searchQuery: string;
  searchControl: FormControl = new FormControl();

  constructor(private appController: AppController,
    private router: Router,
    private route: ActivatedRoute,
    private _serviceApi: ServiceApi,
    private _ngZone: NgZone,
    private _apiConfigApi: ApiConfigApi) { }

  ngOnInit() {
    this.searchParams = {
      name: this.route.snapshot.queryParams['name'] || '',
      page: +this.route.snapshot.queryParams['page'] || 1
    }
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
      .do(() => { this.initialComplete = true; this.state = 'complete' })
      .subscribe((result: any) => {
        this.configs = result.configs;
        this.count = result.count;
        this.loading = false;

        if (this.locPager) {
          this.locPager.total = this.count;
          this.locPager.navigateToPage(this.searchParams.page || 1, false);
        }

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
    this.searchControl
      .valueChanges
      .distinctUntilChanged()
      .do(() => this.loading = true)
      .debounceTime(500)
      .map((value) => { return { name: value, page: 1 } })
      .subscribe((q: IQuery) => {
        this.doSearch(q);
      })

    if (this.locPager)
      this.locPager
        .onChange
        .distinctUntilChanged()
        .do(() => this.loading = true)
        .map((value) => { return { page: value.page } })
        .subscribe((q: IQuery) => {
          this.doSearch(q);
        });
  }

  doSearch(q: IQuery) {
    const req = Object.assign(this.searchParams, q)
    console.log(req)
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
    let depPl = config.plugins.find((p) => Object.keys(p.dependencies).length !== 0)
    let type = 'blank';
    if (depPl) type = 'message';
    if (!!messages.find(m => !!m.error)) type = 'warning';
    if (config.errors && config.errors.length > 0) type = 'error';

    return Object.assign(config, {
      type: type
    })
  }

  editApi(config) {
    this.router.navigate(['./master'], { queryParams: { id: config.id }, relativeTo: this.route })
  }

  toggleActive(config, value) {
    this.loading = true;
    this._apiConfigApi.replaceOrCreate(Object.assign({}, config, {
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

  onDetails(config: ApiConfig) {

  }

  onAddClick() {
    this.router.navigate(['./master'], { relativeTo: this.route });
  }

  onUpdateClick() {
    this.loading = true;
    Observable.of(this.searchParams)
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
      .switchMap((q) => this._doSearchQuery(q))
      .subscribe((result: any) => {
        this.configs = result.configs;
        this.count = result.count;
        this.loading = false;

        if (this.locPager) {
          this.locPager.total = this.count;
          this.locPager.navigateToPage(this.searchParams.page || 1, false);
        }

      }, (err) => {
        console.error(err);
        this.loading = false;
      });

  }

  getConfigMethodsString(config: ApiConfig) {
    return (config.methods || []).join(', ');
  }

  getGroupsApplied() {
    // groups support?
    return '-';
  }

  showSideMenu(config) {
    this.sidebarActive = true;
  }
}
