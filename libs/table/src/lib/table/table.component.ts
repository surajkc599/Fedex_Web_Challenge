import {
  Component,
  Input,
  AfterContentInit,
  ContentChildren,
  QueryList,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FedexTemplate } from './template.directive';

@Component({
  selector: 'fedex-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterContentInit {
  header: TemplateRef<any>;
  body: TemplateRef<any>;
  itemSize = 238;

  @ContentChildren(FedexTemplate) templates: QueryList<FedexTemplate>;

  @Input() datasource: [];
  @Input() columns;
  @Input() rowTrackBy: Function = (index: number) => index;

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.header = item.template;
          break;
        case 'body':
          this.body = item.template;
          break;
      }
    });
  }
}
