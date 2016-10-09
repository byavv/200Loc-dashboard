import {
    Component, Input,
    Output, EventEmitter, forwardRef
} from '@angular/core';
import {
    FormGroup, Validators,
    FormBuilder, ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'key-value-control',
    template: `   
    <div *ngFor='let header of headers; let i = index' class='header-item-container'>         
        <headerItem [item]='header' (changed)='onChange.emit(headers)'></headerItem>
        <button class='btn btn-default remove-header-button' (click)='deleteItem(i)'>
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>
    <div class='header-key-value-inputs-box' (click)='addItem()'>      
          <input type='text' class='form-control' placeholder='key'>        
          <input type='text' class='form-control' placeholder='value'>  
    </div> 
  `,
    styles: [require('./styles/header.scss')],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HeadersList),
            multi: true
        }
    ]
})

export class HeadersList implements ControlValueAccessor {
    private _headers = [];
    @Input()
    set headers(value: Array<any>) {
        this._headers = value;
    }
    get headers(): Array<any> {
        return this._headers;
    }

    addItem() {
        for (let header of this.headers) {
            header.focused = false;
        }
        this.headers.push({ key: '', value: '', focused: true });
    }
    deleteItem(index) {
        console.log(index)
        this.headers.splice(index, 1);
    }

    /**
     * ControlValueAccessor members
     */
    onTouched = () => {
    };

    @Output()
    onChange: EventEmitter<any> = new EventEmitter();
    writeValue(value) {
        if (!!value)
            this.headers = value;
    }
    registerOnChange(fn): void {
        this.onChange.subscribe(fn);

    }
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
}
