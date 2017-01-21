import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate } from '@angular/core';
import { AppController } from '../../shared/services';
import { LoaderComponent } from '../../shared/components';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiConfigApi } from '../../core'

@Component({
  selector: 'api-list',
  templateUrl: './templates/apiList.template.html',
  styleUrls: ['./styles/apiList.scss']
})
export class ApiListComponent implements OnInit, OnDestroy {
  configs: Array<any> = [];
  sub: Subscription;
  loading: boolean = false;
  constructor(private appController: AppController, private router: Router, private _apiConfigApi: ApiConfigApi) { }
  ngOnInit() {
    this.loading = true;
    this.sub = this._apiConfigApi.find().subscribe(configs => {
      this.configs = configs;
      this.loading = false;
    }, (err) => {
      console.error(err);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteApi(config) {
    this._apiConfigApi.deleteById(config.id).subscribe(res => {
      console.log(res);
      let ind = this.configs.indexOf(config);
      this.configs.splice(ind, 1);
    });
  }
  editApi(config) {
    this.router.navigate(['/master'], { queryParams: { id: config.id } })
  }

  toggleActive(config) {
    console.log(config)
  }
}
