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
import { UserApi, LoopBackAuth, UserActions, AppState } from '../../../core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  @ViewChild('close') public close;
  @ViewChild('content') content: TemplateRef<any>;
  signInForm: FormGroup;
  error: string;

  constructor(
    private element: ElementRef,
    private router: Router,
    private _location: Location,
    private modalService: NgbModal,
    private _renderer: Renderer,
    builder: FormBuilder,
    private _store: Store<AppState>,
    private _userActions: UserActions,
    private userApi: UserApi,
    private authService: LoopBackAuth,
    private route: ActivatedRoute) {
    this.signInForm = builder.group({
      username: [''],
      password: [''],
      remember: [true]
    });
  }

  ngAfterViewInit() {
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

  onSubmit(value) {
    this.userApi.login(value)
      .subscribe(
      (data) => this.onSuccess(data),
      (err) => this.onError(err));
  }

  onSuccess(data) {
    const userdata = {
      accessToken: data.id,
      username: data.user.username
    }   
    this._store.dispatch(this._userActions.login(userdata));
    const from = this.route.snapshot.queryParams['from'] || '/';
    this.router.navigate([from]);
  }

  onError(err) {
    this.error = 'Login failed';
  }
}