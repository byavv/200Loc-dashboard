import {
  Component, OnInit, AfterViewInit,
  TemplateRef,
  ElementRef, ViewChild, ViewChildren,
  QueryList, HostListener
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
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
   
   `
  ]
})

export class LoginComponent {
  @ViewChild('close') public close;
  @ViewChild('content') content: TemplateRef<any>;

  constructor(
    private element: ElementRef,
    private router: Router,
    private _location: Location,
    private modalService: NgbModal,
    private route: ActivatedRoute) { }

  ngAfterViewInit() {
    const modalRef = this.modalService
      .open(this.content, { windowClass: 'oh-modal' });

    modalRef.result.then((result) => {
      this._location.back();
    }, (reason) => {
      this._location.back();
    });
  }
  goBack() {
    this._location.back();
  }
}