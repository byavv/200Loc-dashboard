import {
  Component, Input, Output,
  EventEmitter, Renderer, ViewChild, ElementRef
} from '@angular/core';
import {
  FormGroup, Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'key-value-item',
  template: `
     <div class='key-value-item'>
        <form [formGroup]='form' >     
            <div class='key-value-item-inputs-box'>      
              <input #keyInput class='form-control' type='text' placeholder='key' [(ngModel)]='item.key' formControlName='key'>        
              <input class='form-control' type='text' placeholder='value' [(ngModel)]='item.value' formControlName='value'>  
            </div>                        
        </form>
     </div>     
  `,
  styleUrls: ['./styles/header.scss'],
  host:{
    '[style.width]':"'100%'",
    '[style.display]':"'inline-block'"
  }
})
export class KeyValueItem {
  @Input() item: any;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('keyInput') keyInput: ElementRef;

  form: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _renderer: Renderer) {
    this.form = _formBuilder.group({
      key: '',
      value: ''
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(this.changed);
    if (this.item.focused) {
      this._renderer.invokeElementMethod(this.keyInput.nativeElement, 'focus');
    }
  }
}
