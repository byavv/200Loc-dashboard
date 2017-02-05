import {
    Component, OnInit, AfterViewInit,
    TemplateRef,
    ElementRef, ViewChild, ViewChildren,
    QueryList, HostListener, Renderer, Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { ServiceApi } from '../../core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'services-statistic',
    templateUrl: './services-statistic.component.html'
})
export class ServicesStatisticComponent {
    @ViewChild('close') public close;
    @ViewChild('content') content: TemplateRef<any>;
    @Input() service: any;

    error: string;

    constructor(
        private element: ElementRef,
        private router: Router,
        private _location: Location,
        private modalService: NgbModal,
        private _renderer: Renderer,
        private _serviceApi: ServiceApi,
        private route: ActivatedRoute) {
        console.log(route.snapshot.data)
    }

    ngAfterViewInit() {
        const modalRef = this.modalService
            .open(this.content, { windowClass: 'statistic-modal' });

        modalRef.result.then((result) => {
            this._location.back();
        }, (reason) => {
            this._location.back();
        });
    }

    goBack() {
        this._location.back();
    }

    onSubmit(value) {
    }

    onSuccess(data) {
        const userdata = {
            accessToken: data.id,
            username: data.user.username
        }
    }

    onError(err) {
        this.error = 'Login failed';
    }
}