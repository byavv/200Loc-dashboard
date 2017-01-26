import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'loc-switch',
    template: `
    
    <div class="input__switch" [class.on]="value">
        <div class="switch-container">         
        </div>
    </div>
 
    `
})
export class SwitchComponent {
    @Input() disabled: boolean;
    @Input() value: boolean;
    @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();


    @HostListener('click', ['$event'])
    private onClick(event): void {
        if (!this.disabled)
            this.toggleValue();
    }


    public toggleValue(): void {
        this.value = !this.value;
        this.change.emit(this.value);
    }
}