import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate } from '@angular/core';
import { AppController } from '../../shared/services';
import { LoaderComponent } from '../../shared/components';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiConfigApi, Config } from '../../core'

@Component({
  selector: 'api-list',
  templateUrl: './templates/apiList.template.html',
  styleUrls: ['./styles/apiList.scss']
})
export class ApiListComponent implements OnInit, OnDestroy {
  configs: Array<any> = [];
  sub: Subscription;
  loading: boolean = false;

  constructor(private appController: AppController,
    private router: Router,
    private route: ActivatedRoute,
    private _apiConfigApi: ApiConfigApi) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this._apiConfigApi
      .find()
      .subscribe(configs => {
        this.configs = configs;
        this.loading = false;
      }, (err) => {
        console.error(err);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onRemove(config) {
    this._apiConfigApi.deleteById(config.id)
      .subscribe(res => {
        let ind = this.configs.indexOf(config);
        this.configs.splice(ind, 1);
      });
  }

  editApi(config) {
    this.router.navigate(['./master'], { queryParams: { id: config.id }, relativeTo: this.route })
  }

  toggleActive(config, value) {
    console.log(config, value)
  }

  onAddClick() {
    this.router.navigate(['./master'], { relativeTo: this.route });
  }

  getConfigMethodsString(config: Config) {
    return (config.methods || []).join(', ');
  }

  getGroupsApplied(){
    return '-';
  }

  showSideMenu(config){

  }
}
