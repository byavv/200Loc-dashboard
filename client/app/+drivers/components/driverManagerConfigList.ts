import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomBackEndApi } from '../../shared/services';
import { DriverConfig, DriverConfigApi } from '../../core';
import { ModalDirective } from 'ng2-bootstrap';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './templates/driverManagerConfigList.tmpl.html'
})
export class DriverManagerConfigComponent implements AfterViewInit {
    driverName: string;
    driverTemplate: any;
    driverConfigs: Array<any> = [];
    currentSettings = {};
    currentDriver: any = {};
    @ViewChild('lgModal') modal: ModalDirective;

    constructor(
        private activeRoute: ActivatedRoute,
        private driverConfigApi: DriverConfigApi,
        private moduleApi: CustomBackEndApi
    ) { }

    ngAfterViewInit() {
        this.driverName = this.activeRoute.snapshot.queryParams['name'];
        Observable.zip(
            // find configurations of current driver
            this._updateDriverConfigList(),
            // find driver's template to fill form fields
            this.moduleApi
                .getDriverTemplateByName(this.driverName), (v1, v2) => [v1, v2])
            .subscribe(result => {
                this.driverConfigs = result[0];
                this.driverTemplate = result[1];
            });
        this.modal.onHidden.subscribe(() => {
            this.currentSettings = {};
            this.currentDriver = {};
        });
    }
    private _updateDriverConfigList() {
        return this.driverConfigApi
            .find({ where: { driverId: this.driverName } });
    }

    applyValidation() { }

    addOrUpdate() {
        this.currentDriver.settings = this.currentSettings;
        this.currentDriver.driverId = this.driverName;
        this.driverConfigApi
            .upsert(this.currentDriver)
            .subscribe(result => {
                this.modal.hide();
                this._updateDriverConfigList().subscribe((result) => {
                    this.driverConfigs = result
                })
            })
    }
    deleteConfig(id) {
        this.driverConfigApi
            .deleteById(id)
            .flatMap(() => this._updateDriverConfigList())
            .subscribe(result => {
                this.driverConfigs = result;
            })
    }
    showModal(id?: string) {
        if (id) {
            this.driverConfigApi.findById(id)
                .subscribe((driver) => {
                    this.currentSettings = driver.settings;
                    this.currentDriver = Object.assign({}, driver);
                    this.modal.show();
                });
        } else {
            let temp = {}
            for (const key in this.driverTemplate.settings) {
                temp[key] = this.driverTemplate.settings[key].default || '';
            }
            this.currentDriver = new DriverConfig();
            this.currentSettings = temp;
            try {
                this.modal.show();
            } catch (error) {
                console.error(error)
            }
        }
    }
}