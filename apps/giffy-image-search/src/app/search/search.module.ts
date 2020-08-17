import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppFlexLayoutModule } from '../flex-module/flex-layout.module';

// Internal table module exposed from libs/table
import { TableModule } from '@fedex/table';
import { TextboxModule } from '@fedex/textbox';
import { PaginatorModule } from '@fedex/paginator';
import { LoaderModule } from '@fedex/loader';

import { SearchRoutingModule } from './search.routing.module';
import { ContainerComponent } from './container/container.component';
import { MessageComponent } from './container/message/message.component';

@NgModule({
  declarations: [ContainerComponent, MessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    AppFlexLayoutModule,
    TableModule,
    TextboxModule,
    PaginatorModule,
    LoaderModule
  ],
})
export class SearchModule {}
