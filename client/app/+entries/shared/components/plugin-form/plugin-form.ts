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
import { DynamicForm } from '../../../../shared';
import { Plugin, ServiceConfig, ServiceConfigApi } from '../../../../core';

@Component({
    selector: 'plugin-form',
    templateUrl: './plugin-form.tmpl.html'
})
export class PluginForm {
    form: FormGroup;
    pluginTemplate: any;
    dependenciesTemplate: any;
    deps: Array<any>;
    settingsValue: any;
    dependenciesValue: any = {};
    serviceConfigs: any = {};

    @ViewChild('settingsForm') settForm: DynamicForm;
    @ViewChild('dependenciesForm') depsForm: DynamicForm;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    private _plugin: Plugin;
    @Input()
    set plugin(pl: Plugin) {
        this._plugin = Object.assign({}, pl);
        // set template for plugin settings
        this.pluginTemplate = this._plugin.settingsTemplate;
        // set config and find available options for required service
        let fromDependencies = Observable
            .from([...this._plugin.dependenciesTemplate || []]);

        Observable.zip(
            // save key
            fromDependencies
                .map((dep) => dep),
            // find service configs to fill select options
            fromDependencies
                .flatMap((dep) => this.serviceConfigApi
                    .find({ where: { serviceId: dep } })),

            /* turn required service name as string into dynamic-form format
             *  Ex: 'myService' => 
             *              {                          
             *                  label: 'myService',
             *                  helpString: myService configuration,
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
             *         label: 'myservice',
             *         helpString: myservice configuration,
             *         type: 'select'               
             *      }  
             *         => 
             *      {                          
             *         label: 'myservice',
             *         helpString: myservice configuration,
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
        private serviceConfigApi: ServiceConfigApi) {
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
