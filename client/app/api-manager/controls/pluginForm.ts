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
    templateUrl: './templates/pluginForm.html'
})
export class PluginForm {
    form: FormGroup;
    pluginTemplate: any;
    dependenciesTemplate: any;
    deps: Array<any>;
    settingsValue: any;
    dependenciesValue: any = {};
    driverConfigs: any = {};

    @ViewChild('settingsForm') settForm: DynamicForm;
    @ViewChild('dependenciesForm') depsForm: DynamicForm;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    private _plugin: Plugin;
    @Input()
    set plugin(pl: Plugin) {
        this._plugin = Object.assign({}, pl);
        // set template for plugin settings
        this.pluginTemplate = this._plugin.settingsTemplate;
        // set config and find available options for required driver
        let fromDependencies = Observable
            .from([...this._plugin.dependenciesTemplate || []]);

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

                // set dynamic form template for plugin's dependencies           
                this.dependenciesValue = this._plugin.dependencies || [];
                console.log("DEPENDENCIES VALUE", this.dependenciesValue)

            });
        // set dynamic form template for regular settings     
        this.settingsValue = this._plugin.settings || {};
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
        this._applyValidation();
        this.form
            .valueChanges
            .subscribe((value) => {
                this.onChange.emit(value)
                this._applyValidation();
            });
    }

    private _applyValidation() {
        const isValid = this.settForm.valid && this.depsForm.valid;
        this.plugin.valid = isValid;
        this.validation.emit(isValid);
    }

    @Output()
    validation: EventEmitter<any> = new EventEmitter();
}
