import { Component } from '@angular/core';

@Component({
    template: `
    <router-outlet></router-outlet>

    <!-- Not working: https://github.com/angular/angular/issues/10981 -->
    <!--    
    <router-outlet name="statistic"></router-outlet>    
    -->
    `
})
export class EntriesBaseComponent { }