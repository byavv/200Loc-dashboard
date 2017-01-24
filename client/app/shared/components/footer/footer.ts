import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'loc-footer',
    templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
    constructor() { }
    seo = {
        title: 'Loc200-Dashboard'
    };
    ngOnInit() { }
}
