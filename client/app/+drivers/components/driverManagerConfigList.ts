import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverConfig, DriverConfigApi, DriverApi } from '../../core';
import { ModalDirective } from 'ng2-bootstrap';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './templates/driverManagerConfigList.tmpl.html'
})
export class DriverManagerConfigComponent implements AfterViewInit {
    driverName: string;
    driverTemplate: any;
    driverConfigs: Array<DriverConfig> = [];
    currentSettings = {};
    currentDriver: any = {};
    modalRef: NgbModalRef;
    //  @ViewChild('lgModal') modal: ModalDirective;
    @ViewChild('close') public close;
    @ViewChild('driverModalContent') content: TemplateRef<any>;

    constructor(
        private activeRoute: ActivatedRoute,
        private driverConfigApi: DriverConfigApi,
        private driverApi: DriverApi,
        private modalService: NgbModal,
    ) { }

    ngAfterViewInit() {
        this.driverName = this.activeRoute.snapshot.queryParams['name'];
        Observable.zip(
            // find configurations of current driver
            this._updateDriverConfigList(),
            // find driver's template to fill form fields
            this.driverApi
                .getDriverTemplateByName(this.driverName), (v1, v2) => [v1, v2])
            .subscribe((result: any) => {
                this.driverConfigs = result[0];
                this.driverTemplate = result[1];
            });
        // this.modal.onHidden.subscribe(() => {
        //     this.currentSettings = {};
        //     this.currentDriver = {};
        // });
    }
    private _updateDriverConfigList(): Observable<Array<DriverConfig>> {
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
                if (this.modalRef) this.modalRef.close();
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
                    this._show();
                });
        } else {
            let temp = {}
            for (const key in this.driverTemplate.settings) {
                temp[key] = this.driverTemplate.settings[key].default || '';
            }
            this.currentDriver = new DriverConfig();
            this.currentSettings = temp;
            try {
                this._show();
            } catch (error) {
                console.error(error)
            }
        }
    }

    private _show() {
        this.modalRef = this.modalService
            .open(this.content, { windowClass: 'driver-modal' });

        this.modalRef.result.then((result) => {
            this.currentSettings = {};
            this.currentDriver = {};
        }, (reason) => {

        });
    }

}
/*


 const modalRef = this.modalService
      .open(this.content, { windowClass: 'login-modal', backdrop: 'static' });

    modalRef.result.then((result) => {
      this._location.back();
    }, (reason) => {
      this._location.back();
    });
    let body = getDOM().defaultDoc().getElementsByTagName('body')[0];
    if (body) {
      this._renderer.setElementClass(body, 'blurred', true);
    }

 */