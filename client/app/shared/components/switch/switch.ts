import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'loc-switch',
    template: `
    
    <div class="m-form__control input__switch" [class.on]="value">
        <div class="switch-container">         
        </div>
    </div>
 
    `
})
export class SwitchComponent {
    @Input() disabled: boolean;
    @Input() value: boolean;
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor()
    { }

    @HostListener('click', ['$event'])
    private onClick(event): void {
        if (!this.disabled)
            this.toggleValue();
    }

    public setValue(value: boolean): void {
        this.value = value;
        this.onChange(value);
    }

    public toggleValue(): void {
        if (this.value)
            this.setValue(false)
        else
            this.setValue(true)
    }

    public onChange(event): void {
        this.valueChange.emit(event);
    }
}