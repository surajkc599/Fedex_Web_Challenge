import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox/textbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TextboxComponent],
  exports: [TextboxComponent],
})
export class TextboxModule {}
