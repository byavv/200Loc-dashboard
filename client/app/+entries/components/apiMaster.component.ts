import { Component, OnInit, ViewChild, QueryList } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MASTER_STEPS_COMPONENTS } from "./steps";
import { Config, ApiConfigApi } from "../../core";
import { UiTabs, UiPane } from '../directives';
import { Observable, Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState, getConfigState, getMasterState, getValidationState } from '../../core/reducers';
import { MasterActions, ConfigActions } from '../../core/actions';

@Component({
  selector: "api-master",
  template: `
    <div class="l-api">
      <div class="l-api__header">
          <span class="title"><a routerLink='/entries'>Entries</a> / wizard</span>
      </div>
      <section class="l-api__master">      
        <ui-tabs #tab rest-height default='general'>
            <ui-pane id='general' title='config' [valid]='(stepGeneral.validation | async)'>
                <step-general #stepGeneral (next)="tab.goTo($event)" [submitted]='submitted'> </step-general>
            </ui-pane>
            <ui-pane id='plugins' title='pipe' [valid]='(stepPlugins.validation | async)'>
                <step-plugins #stepPlugins (next)="tab.goTo($event)" [submitted]='submitted' ></step-plugins>
            </ui-pane>
            <ui-pane id='preview' title='test' [valid]='true'>
                <step-preview (next)="onDone()"></step-preview>
            </ui-pane>     
        </ui-tabs>     
      </section>
      <template ngbModalContainer></template>
    </div>
    `
})
export class ApiMasterComponent {

  @ViewChild(UiTabs) tab: UiTabs;
  id: string;
  loading: boolean = true;
  submitted: boolean = false;
  queryRouteSub: Subscription;
  masterStateSub_n: Subscription;
  validationSub_n: Subscription;
  validation: any = {};
  config: Config = {};
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _configActions: ConfigActions,
    private _masterActions: MasterActions,
    private apiConfigApi: ApiConfigApi,
    public store: Store<AppState>) { }

  ngOnInit() {
    this.validationSub_n = this.store
      .let(getValidationState())
      .subscribe((validation) => {
        this.validation = validation;
      })
    this.masterStateSub_n = this.store
      .let(getMasterState())
      .subscribe((config) => {
        this.config = config;
      });
  }

  ngAfterViewInit() {
    this.queryRouteSub = this._activatedRoute
      .queryParams
      .flatMap((params): any => {
        this.id = params["id"];
        return this.id
          ? this.apiConfigApi.findById(this.id)
          : Observable.of(new Config());
      })
      .subscribe((config) => {
        this.store.dispatch(this._configActions.setConfig(config));
        this.store.dispatch(this._masterActions.setConfig(config));
      });
  }

  ngOnDestroy() {
    if (this.queryRouteSub) this.queryRouteSub.unsubscribe();
    if (this.masterStateSub_n) this.masterStateSub_n.unsubscribe();
    if (this.validationSub_n) this.validationSub_n.unsubscribe()
  }

  onDone() {
    this.submitted = true;

    for (let KEY in this.validation) {
      if (!this.validation[KEY]) {
        this.tab.goTo(KEY);
        return;
      }
    }
    let plugins: Array<any> = [...this.config.plugins];
    plugins = plugins.map((plugin) => {
      return {
        name: plugin.name,
        order: plugin.order,
        settings: plugin.settings,
        dependencies: plugin.dependencies
      }
    });
    console.log("CONFIG TO SAVE", Object.assign(this.config, { plugins: plugins }));
    this.apiConfigApi.upsert(Object.assign(this.config, { plugins: plugins }))
      .subscribe((result) => {
        this.router.navigate(['/']);
      }, (err) => {
        // notify
      });
  }
}