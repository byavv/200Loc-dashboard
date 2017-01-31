import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceConfig, ServiceConfigApi, ServiceApi } from '../../core';
import { ModalDirective } from 'ng2-bootstrap';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './services-config-list.component.tmpl.html'
})
export class ServicesConfigListComponent implements AfterViewInit {
    serviceName: string;
    serviceTemplate: any;
    serviceConfigs: Array<ServiceConfig> = [];
    currentService: any = {};
    modalRef: NgbModalRef;
    @ViewChild('close') public close;
    @ViewChild('serviceModalContent') content: TemplateRef<any>;

    constructor(
        private activeRoute: ActivatedRoute,
        private serviceConfigApi: ServiceConfigApi,
        private serviceApi: ServiceApi,
        private modalService: NgbModal,
    ) { }

    ngAfterViewInit() {
        this.serviceName = this.activeRoute.snapshot.queryParams['name'];
        Observable.zip(
            // find configurations of current cervice
            this._updateServiceConfigList(),
            // find service's template to fill form fields
            this.serviceApi
                .getServiceTemplateByName(this.serviceName), (v1, v2) => [v1, v2])
            .subscribe((result: any) => {
                this.serviceConfigs = result[0];
                this.serviceTemplate = result[1];
            });
    }
    private _updateServiceConfigList(): Observable<Array<ServiceConfig>> {
        return this.serviceConfigApi
            .find({ where: { serviceId: this.serviceName } });
    }

    addOrUpdate() {
        this.currentService.serviceId = this.serviceName;
        this.serviceConfigApi
            .upsert(this.currentService)
            .subscribe(result => {
                if (this.modalRef) this.modalRef.close();
                this._updateServiceConfigList()
                    .subscribe((result) => {
                        this.serviceConfigs = result
                    })
            })
    }
    deleteConfig(id) {
        this.serviceConfigApi
            .deleteById(id)
            .flatMap(() => this._updateServiceConfigList())
            .subscribe(result => {
                this.serviceConfigs = result;
            })
    }
    showModal(id?: string) {
        if (id) {
            this.serviceConfigApi.findById(id)
                .subscribe((service) => {
                    console.log(service)
                    this.currentService = Object.assign({}, service);
                    this._show();
                });
        } else {
            let temp = {}
            for (const key in this.serviceTemplate.settings) {
                temp[key] = this.serviceTemplate.settings[key].default || '';
            }
            this.currentService = new ServiceConfig({ settings: temp });
            try {
                this._show();
            } catch (error) {
                console.error(error)
            }
        }
    }

    private _show() {
        this.modalRef = this.modalService
            .open(this.content, { windowClass: 'services-modal' });

        this.modalRef.result.then((result) => {
            this.currentService = {};
        }, (reason) => {

        });
    }

    showSideMenu(config) {
    }
}
