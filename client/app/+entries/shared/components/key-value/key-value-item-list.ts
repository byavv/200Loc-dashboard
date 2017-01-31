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
        <key-value-item [item]='header' (changed)='onChange.emit(headers)'></key-value-item>
        <button class='btn btn-default remove-button' (click)='deleteItem(i)'>
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>
    <div class='key-value-item-inputs-box' (click)='addItem()'>      
          <input type='text' class='form-control' placeholder='key'>        
          <input type='text' class='form-control' placeholder='value'>  
    </div> 
  `,
    styleUrls: ['./key-value-item.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => KeyValueItemsList),
            multi: true
        }
    ]
})

export class KeyValueItemsList implements ControlValueAccessor {
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
