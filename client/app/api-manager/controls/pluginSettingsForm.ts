import {
    Component, Input,
    Output, OnInit,
    EventEmitter, ViewChild
} from '@angular/core';
import {
    FormGroup, FormArray,
    Validators, FormBuilder,
    FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicForm } from './';
import { Plugin, DriverConfig } from '../../core/models';
import { DriverConfigApi } from '../../shared/services';

@Component({
    selector: 'plugin-form',
    templateUrl: './templates/pluginSettingsForm.html'
})
export class PluginSettings {
    form: FormGroup;
    pluginTemplate: any;
    dependenciesTemplate: any;
    deps: Array<any>;
    settingsValue: any;
    dependenciesValue: any = {};
    driverConfigs: any = {};

    @ViewChild('settingsForm') settForm: DynamicForm;
    @ViewChild('dependenciesForm') depsForm: DynamicForm;

    private _plugin;
    @Input()
    set plugin(pl: Plugin) {
        this._plugin = pl;
        // set template for plugin settings
        this.pluginTemplate = pl.settingsTemplate;

        // set config and find available options for required driver
        let fromDependencies = Observable
            .from([...pl.dependenciesTemplate || []]);

        Observable.zip(
            // save key
            fromDependencies
                .map((dep) => dep),
            // find driver configs to fill select options
            fromDependencies
                .flatMap((dep) => this.driverConfigApi
                    .find({ where: { driverId: dep } })),

            /* turn required driver name as string into dynamic-form format
             *  Ex: 'myDriver' => 
             *              {                          
             *                  label: 'myDriver',
             *                  helpString: myDriver configuration,
             *                  type: 'select'               
             *              } 
             */
            fromDependencies
                .reduce((fields, v) => {
                    fields[v] = {
                        required: true,
                        label: v,
                        help: `${v} configuration`,
                        type: "select"
                    }
                    return fields;
                }, {}),

            /*  Zip callback
             *  add options to construct 'dynamicForm-ready' object
             *  Ex: {                          
             *         label: 'myDriver',
             *         helpString: myDriver configuration,
             *         type: 'select'               
             *      }  
             *         => 
             *      {                          
             *         label: 'myDriver',
             *         helpString: myDriver configuration,
             *         type: 'select',
             *         options: [
             *             key:'someKey', value:'someValue'
             *         ]      
             *      } 
             */
            (key, options, template) => {
                template[key].options = options.map((option) => {
                    return {
                        key: option.name,
                        value: option.id
                    }
                });
                return template;
            }).subscribe(result => {
                this.dependenciesTemplate = result;
                this.dependenciesValue = pl.value ? pl.value.dependencies : {};
                this.form
                    .valueChanges
                    .subscribe((value) => {
                        this.plugin.value = value;
                        this.validation.emit(this.settForm.valid && this.depsForm.valid);
                    });
            });
        this.settingsValue = pl.value ? pl.value.settings : {};
    }
    get plugin() {
        return this._plugin;
    }

    constructor(private _builder: FormBuilder,
        private driverConfigApi: DriverConfigApi) {
        this.form = this._builder.group({
            settings: [],
            dependencies: []
        });
    }

    ngAfterViewInit() {
        this.validation.emit(this.settForm.valid && this.depsForm.valid)
    }
    @Output()
    validation: EventEmitter<any> = new EventEmitter();
}
