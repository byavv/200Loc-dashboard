import {
    Component, Input,
    Output, OnInit, Optional, Host,
    EventEmitter, forwardRef
} from '@angular/core';
import {
    FormGroup,
    Validators,
    FormBuilder,
    NG_VALIDATORS, FormControl
} from '@angular/forms';
import {
    NgControl, NgModel,
    ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';


/**
 * Component for dynamic forms, defined in JSON
 * 
 * Ex.: 
 *     "field_1": {
 *          "default": "42",
 *          "required": true,
 *          "label": "Answer",
 *          "help": "The answer to life, universe and everything",
 *          "type": "string"
 *      },
 *     "field_2": {
 *          "default": true,
 *          "required": true,
 *          "label": "Answer",
 *          "help": "Now that Microsoft is so big, should it be called Macrosoft?",
 *          "type": "select",
 *          "options": [
 *              {
 *                  "key": "Yes",
 *                  "value": true
 *              },
 *              {
 *                  "key": "No",
 *                  "value": false
 *              }
 *          ]
 *      } 
 */
@Component({
    selector: 'dynamic-form',
    templateUrl: './templates/dynamicForm.html',
    exportAs: 'dynForm',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DynamicForm),
            multi: true
        }
    ]
})
export class DynamicForm implements ControlValueAccessor {
    private _fields = [];
    @Input()
    set fields(value: any) {
        let group = {};
        if (value) {
            this._fields.slice(0, this._fields.length);
            Object.keys(value).forEach((key: any) => {
                group[key] = value[key].required
                    ? ['', Validators.required]
                    : [''];
                this._fields.push({
                    key: key,
                    value: value[key].default != undefined ? value[key].default : '',
                    label: value[key].label,
                    helpString: value[key].help,
                    type: value[key].type ? value[key].type : 'string',
                    options: value[key].options ? value[key].options : [], // if property is array
                });
            });

            this.form = this._builder.group(group);
            this.form.valueChanges
                .subscribe(value => {
                    this.onChange.next(value);
                });
        }
    }

    form: FormGroup = this._builder.group({});
    constructor(private _builder: FormBuilder) { }

    get fields() {
        return this._fields;
    }
    get valid() {
        return this.form ? this.form.valid : false;
    }

    /**
     * ControlValueAccessor members
     */
    onTouched = () => {
    };
    @Output()
    onChange: EventEmitter<any> = new EventEmitter(true);
    writeValue(value) {
        if (value !== undefined) {
            for (const key in value) {
                const field = this.fields.find((field) => field.key === key);
                if (field) {
                    field.value = value[key];
                }
            }
        }
    }
    registerOnChange(fn): void {
        this.onChange.subscribe(fn);

    }
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
}
