import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomBackEndApi } from '../../shared/services';

@Component({
    templateUrl: './templates/driverTypes.tmpl.html',
    styleUrls: ['./styles/driverTypes.scss']
})
export class DriverTypesComponent implements OnInit {
    drivers: Array<any> = [];

    constructor(
        private router: Router,
        private backEnd: CustomBackEndApi) { }

    ngOnInit() {
        this.backEnd.getAvailableDrivers()
            .subscribe((drivers) => {
                this.drivers = drivers;
            })
    }
}
