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
    selector: 'sign-up',
    templateUrl: './signUp.component.html',
    styles: [
        `
   :host >>> .modal-dialog {
      position: relative;         
      margin-top: 60px;
      width: 720px!important;
      max-width: 100%;
    }
   :host >>> .modal-content {
      border-radius: 0;  
      background: transparent;
      width: 100%;
      height: 100%;
      border: none;
    }
   @media screen and (max-width: 768px) {
      :host >>> .modal-dialog {
        width: 100%!important;          
        height: 100%!important;        
        margin: 0px;   
      }
   }

   :host >>> .modal-backdrop:before{
      content: '';
      margin: -35px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(10px);
      z-index: -1;
   }
   
   `
    ]
})

export class SignUpComponent {
    @ViewChild('close') public close;
    @ViewChild('content') content: TemplateRef<any>;

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
        this.signUpForm = builder.group({
            username: [''],
            password: ['']
        });
    }

    ngAfterViewInit() {
        const modalRef = this.modalService
            .open(this.content, { windowClass: 'oh-modal' });

        modalRef.result.then((result) => {
            this._location.back();
        }, (reason) => {
            this._location.back();
        });
        let body = getDOM().defaultDoc().getElementsByTagName('body')[0];
        if (body) {
            this._renderer.setElementClass(body, 'blurred', true);
        }
    }

    ngOnDestroy() {
        let body = getDOM().defaultDoc().getElementsByTagName('body')[0];
        if (body) {
            this._renderer.setElementClass(body, 'blurred', false);
        }
    }
    goBack() {
        this._location.back();
    }

    signUpForm: FormGroup;
    error: string;


    onSubmit(value) {
        console.log(value)
        this.userApi.signup(value)
            .subscribe(
            (data) => this.onSuccess(data),
            (err) => this.onError(err));
    }
    onSuccess(data) {
        console.log(data);
        // this.authService.persist({
        //     accessToken: data.id,
        //     username: data.email
        // });
        // this.router.navigate(['/']);
    }
    onError(err) {
        console.error(err)
        this.error = 'Login failed';
    }
}