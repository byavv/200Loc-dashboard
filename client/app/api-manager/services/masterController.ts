import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject, Observer } from 'rxjs';
import { Config } from '../../core/models';

@Injectable()
export class MasterController {
    init$: ReplaySubject<any> = new ReplaySubject();
    update$: ReplaySubject<any> = new ReplaySubject();

    validate$: BehaviorSubject<any> = new BehaviorSubject({
        general: false,
        plugins: false
    });
    error$: Subject<any> = new Subject();

    config: any = {};

    validation = {
        general: true,
        plugins: true
    };

    setValidity(key, value) {
        this.validation[key] = value;
       // this.validate$.next(this.validation);
    }

    validate(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            const error = Object.keys(this.validation).find(key => !this.validation[key]);
            console.log(error)
            if (error) {
                observer.error(error);
                this.error$.next(error);
            } else {
                observer.next(null);
                observer.complete();
            }
        })
    }
    update() {
        this.update$.next(this.config);
    }

    // isValid(key): Observable<any> {      
    //     retun  this.validation[key]
    //   //  return this.validate$.pluck(key);    
    // }

    isValid(key): boolean {
        return this.validation[key] || false;
        //  return this.validate$.pluck(key);    
    }

    init(conf) {
        Object.assign(this.config, conf);
        this.validate$.next(this.validation);
        this.init$.next(this.config);
    }
}
