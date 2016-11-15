import {Component, EventEmitter, Output, ElementRef, Input} from '@angular/core';

declare var ace: any;

@Component({
    selector: 'ace-editor',
    template: '',
    styles: [':host { display:block;width:100%; }']
})
export class AceEditorComponent {
    @Output('textChanged') textChanged = new EventEmitter();
    @Input('style') style: any = {};
    _options: any = {};
    _readOnly: boolean = false;
    _theme: string = "eclipse";
    _mode: string = "json";
    _autoUpdateContent: boolean = true;
    _editor: any;
    oldText: any;

    constructor(elementRef: ElementRef) {
        let el = elementRef.nativeElement;
        this._editor = ace["edit"](el);

        this.init();
        this.initEvents();
    }

    init() {
        this._editor.setOptions(this._options || {});
        this._editor.setTheme(`brace/theme/${this._theme}`);
        this._editor.getSession().setMode(`brace/mode/${this._mode}`);
        this._editor.setReadOnly(this._readOnly);
    }

    initEvents() {
        this._editor.on('change', () => {
            let newVal = this._editor.getValue();
            if (newVal === this.oldText) return;
            if (typeof this.oldText !== 'undefined')
                this.textChanged.emit(newVal);
            this.oldText = newVal;
        });
    }

    @Input() set options(options: any) {
        this.setOptions(options);
    }

    setOptions(options: any) {
        this._options = options;
        this._editor.setOptions(options || {});
    }

    @Input() set readOnly(readOnly: any) {
        this.setReadOnly(readOnly);
    }

    setReadOnly(readOnly: any) {
        this._readOnly = readOnly;
        this._editor.setReadOnly(readOnly);
    }

    @Input() set theme(theme: any) {
        this.setTheme(theme);
    }

    setTheme(theme: any) {
        this._theme = theme;
        this._editor.setTheme(`brace/theme/${theme}`);
    }

    @Input() set mode(mode: any) {
        this.setMode(mode);
    }

    setMode(mode: any) {
        this._mode = mode;
        this._editor.getSession().setMode(`brace/mode/${mode}`);
    }

    @Input() set text(text: any) {
        this.setText(text);
    }

    setText(text: any) {
        if (text == null)
            text = "";

        if (this._autoUpdateContent == true) {
            this._editor.setValue(text);
            this._editor.clearSelection();
            this._editor.focus();
        }
    }

    @Input() set autoUpdateContent(status: any) {
        this.setAutoUpdateContent(status);
    }

    setAutoUpdateContent(status: any) {
        this._autoUpdateContent = status;
    }

    getEditor() {
        return this._editor;
    }
}