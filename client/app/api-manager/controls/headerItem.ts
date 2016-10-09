import {
  Component, Input, Output,
  EventEmitter, Renderer, ViewChild, ElementRef
} from '@angular/core';
import {
  FormGroup, Validators,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'headerItem',
  template: `
     <div class='header-item'>
        <form [formGroup]='form' >     
            <div class='header-key-value-inputs-box'>      
              <input #keyInput class='form-control' type='text' placeholder='key' [(ngModel)]='item.key' formControlName='key'>        
              <input class='form-control' type='text' placeholder='value' [(ngModel)]='item.value' formControlName='value'>  
            </div>                        
        </form>
     </div>     
  `,
  styles: [require('./styles/header.scss')]
})
export class HeaderItem {

  @Input() item: any;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  @ViewChild('keyInput') keyInput: ElementRef;
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