import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusClass]'
})
export class StatusClassDirective {
  @Input('appStatusClass') done: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.done) {
      this.renderer.addClass(this.el.nativeElement, 'done');
    }
  }
}
