import {
    Component, OnInit, AfterViewInit,
    TemplateRef,
    ElementRef, ViewChild, ViewChildren,
    QueryList, HostListener, Renderer
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserApi, LoopBackAuth } from '../../../core';

@Component({
    selector: 'change-psw',
    templateUrl: './changePsw.component.html'
})

export class ChangePasswordComponent {
    changeForm: FormGroup;
    error: string;
    submitted: boolean = false;
    constructor(
        private element: ElementRef,
        private router: Router,
        private _location: Location,
        private modalService: NgbModal,
        private _renderer: Renderer,
        builder: FormBuilder,

        private userApi: UserApi,
        private authService: LoopBackAuth,
        private route: ActivatedRoute) {
        this.changeForm = builder.group({
            username: [''],
            oldpassword: [''],
            newpassword: [''],
            confirmnewpassword: ['']
        });
    }

    onSubmit(value) {
        console.log(value);
        this.submitted = true;
        if (this.changeForm.valid) {
            this.userApi.change({
                username: value.username,
                password: value.newpassword
            })
                .subscribe(
                (data) => this.onSuccess(data),
                (err) => this.onError(err));
        }
    }
    onSuccess(data) {
        this.router.navigate(['auth'])
    }
    onError(err) {
        console.error(err)
        this.error = 'Login failed';
    }
}