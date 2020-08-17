import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TableComponent } from './table/table.component';

import { FedexTemplate } from './table/template.directive';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  declarations: [TableComponent, FedexTemplate],
  exports: [TableComponent, FedexTemplate],
})
export class TableModule {}
