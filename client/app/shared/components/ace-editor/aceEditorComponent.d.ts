import { EventEmitter, ElementRef } from '@angular/core';
export declare class AceEditorComponent {
    textChanged: EventEmitter<{}>;
    style: any;
    _options: any;
    _readOnly: boolean;
    _theme: string;
    _mode: string;
    _autoUpdateContent: boolean;
    _editor: any;
    oldText: any;
    constructor(elementRef: ElementRef);
    init(): void;
    initEvents(): void;
    options: any;
    setOptions(options: any): void;
    readOnly: any;
    setReadOnly(readOnly: any): void;
    theme: any;
    setTheme(theme: any): void;
    mode: any;
    setMode(mode: any): void;
    text: any;
    setText(text: any): void;
    autoUpdateContent: any;
    setAutoUpdateContent(status: any): void;
    getEditor(): any;
}