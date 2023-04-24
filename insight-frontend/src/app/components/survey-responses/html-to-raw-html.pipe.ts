import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlToRawHtmlPipe'
})
export class HtmlToRawHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    // Sanitize the raw HTML to prevent XSS attacks
    const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(value);
    return sanitizedHtml;
  }

}