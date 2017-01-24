import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url): SafeUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
} 


@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(text): SafeUrl {
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }
} 