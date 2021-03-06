import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'option-input',
  templateUrl: './option-input.tmpl.html'
})
export class OptionInput {
  @Input() field: any;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.field.key] ? this.form.controls[this.field.key].valid : true;
  }
}
