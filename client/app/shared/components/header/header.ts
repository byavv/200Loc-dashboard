import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated: boolean = false;
    shouldRedirect: boolean;
    username: string;
    active: boolean = false;

    constructor(private router: Router) { 
        this.closeSidebarHandler = this.closeSidebarHandler.bind(this);
    }

    ngOnInit() {
        /* this.username = this.identity.user.name || "Guest";
         this.isAuthenticated = this.identity.user.isAuthenticated();
         this.identity.identity$
             .subscribe((user) => {
                 this.isAuthenticated = user.isAuthenticated();
                 this.username = user.name;
             });*/
    }
    signOut() {
        /* this.auth.signOut().subscribe(
              (res) => {
                  this.identity.update();
                  this.storage.removeItem("authorizationData")
              },
              (err) => {
                  this.identity.update();
                  this.storage.removeItem("authorizationData");
              }
          );*/
    }
  
    closeSidebarHandler() {
        this.active = false;
    }
}
