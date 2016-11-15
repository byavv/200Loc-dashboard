import { Component, OnInit, ViewChild, QueryList } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MASTER_STEPS_COMPONENTS } from "./steps";
import { MasterController } from "../services/masterController";
import { ApiConfigApi } from "../../shared/services";
import { Config } from "../../core/models"
import { UiTabs, UiPane, RestSize } from '../directives';
import { Observable, Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState, getMasterState } from '../../core/reducers';
import { MasterActions } from '../../core/actions';

@Component({
  selector: "api-master",
  template: `
    <div class="row">
        <div class="col-md-12 col-sm-12" style="position: relative;">    
            <loader [active]='loading' [async]='master.init$' [delay]='500'></loader>
         <!--     <ui-tabs #tab rest-height default='general'>
                <ui-pane id='general' title='config' [valid]="(master.isValid('general') | async)">
                    <step-general (next)="tab.goTo($event)"></step-general>
                </ui-pane>
                <ui-pane id='plugins' title='pipe' [valid]="(master.isValid('plugins') | async)">
                    <step-plugins (next)="tab.goTo($event)"></step-plugins>
                </ui-pane>
                <ui-pane id='preview' title='test' [valid]='true'>
                    <step-preview (next)="onDone()"></step-preview>
                </ui-pane>     
            </ui-tabs>

           -->

           <ui-tabs #tab rest-height default='general'>
                <ui-pane id='general' title='config' [valid]="validation['general']">
                    <step-general (next)="tab.goTo($event)" ></step-general>
                </ui-pane>
                <ui-pane id='plugins' title='pipe' [valid]="validation['plugins']">
                    <step-plugins (next)="tab.goTo($event)" ></step-plugins>
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
  queryRouteSub: Subscription;
  validation: any = {}
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private master: MasterController,
    private apiConfigApi: ApiConfigApi,
    private _store: Store<AppState>) {

  }
  ngOnInit() {

    this._store
      .let(getMasterState())
      .subscribe((value) => {
        console.log("MASTER STATE", value)
      })

    this.master.init$.subscribe(() => {
      this.loading = false;
      this._store.dispatch({
        type: MasterActions.SET_GENERAL_DATA,
        payload: { form: 'fsd' }
      });
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
        this.master.init(config);
      });
    this.master.validate$
      .subscribe((value) => {
        console.log('validation changed', value)
        this.validation = value;
      });
  }

  ngOnDestroy() {
    this.queryRouteSub.unsubscribe();
  }

  onDone() {
    this.master
      .validate()
      .do(() => { this.loading = true; })
      // create new or update
      .flatMap(() => this.apiConfigApi.upsert(this.master.config))
      .subscribe((result) => {
        this.router.navigate(['/']);
      }, (err) => {
        if (err)
          this.tab.goTo(err);
      });
  }
}