import { Component, OnInit, ViewChild, QueryList } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MASTER_STEPS_COMPONENTS } from "./steps";
import { MasterController } from "../services/masterController";
import { ApiConfigApi } from "../../shared/services";
import { Config } from "../../core/models"
import { UiTabs, UiPane, RestSize } from '../directives';
import { Observable, Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState, getConfigState, getMasterState, getValidationState } from '../../core/reducers';
import { MasterActions, ConfigActions } from '../../core/actions';

@Component({
  selector: "api-master",
  template: `
    <div class="row">
        <div class="col-md-12 col-sm-12" style="position: relative;"> 
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
        </div>
    </div>
    `,
  viewProviders: [MasterController]
})

export class ApiMasterComponent {
  @ViewChild(UiTabs) tab: UiTabs;
  id: string;
  loading: boolean = true;
  submitted: boolean = false;
  queryRouteSub: Subscription;
  validation: any = {};
  config: Config = {};
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _configActions: ConfigActions,
    private _masterActions: MasterActions,
    private apiConfigApi: ApiConfigApi,
    public store: Store<AppState>) {

  }
  ngOnInit() {

    this.store
      .let(getValidationState())
      .subscribe((validation) => {       
        this.validation = validation;
      })
    /*  this.store
        .let(getConfigState())
        .subscribe((config) => {
          console.log("MASTER CONFIG", config)
          this.config = config;
        });
  */
    this.store
      .let(getMasterState())
      .select(state => state.config)
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
    this.queryRouteSub.unsubscribe();
  }

  onDone() {
    this.submitted = true;
    console.log("CONFIG TO SAVWE", this.config)
    for (let KEY in this.validation) {
      if (!this.validation[KEY]) {
        this.tab.goTo(KEY);
        return;
      }
    }
    this.apiConfigApi.upsert(this.config)
      .subscribe((result) => {
        this.router.navigate(['/']);
      }, (err) => {
        // notify
      });
    /* this.master
       .validate()
       .do(() => { this.loading = true; })
       // create new or update
       .flatMap(() => this.apiConfigApi.upsert(this.master.config))
       .subscribe((result) => {
         this.router.navigate(['/']);
       }, (err) => {
         if (err)
           this.tab.goTo(err);
       });*/
  }
}