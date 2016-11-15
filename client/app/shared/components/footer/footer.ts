import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
    constructor() { }
    seo = {
        title: 'Loc200-Gate'
    };
    ngOnInit() { }
}
