import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[fedexTemplate]'
})
export class FedexTemplate {
  @Input('fedexTemplate') name: string;
  constructor(public template: TemplateRef<any>) {
  }

  getType(): string {
    return this.name;
  }
}
