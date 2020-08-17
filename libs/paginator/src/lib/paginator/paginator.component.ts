import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IPaginator } from '@fedex/data';

@Component({
  selector: 'fedex-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() totalRecords = 100;
  @Input() recordsPerPage = 25;
  @Output() pageChange = new EventEmitter<IPaginator>();

  offset = 1;
  endIndex = 25;

  shouldDisablePrevious = true;
  shouldDisableNext = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.totalRecords?.currentValue < this.endIndex) {
      this.endIndex = changes?.totalRecords?.currentValue;
      this.shouldDisableNext = true;
    }
  }

  previous() {
    this.endIndex = this.offset - 1;
    this.offset = this.endIndex - this.recordsPerPage + 1;
    if (this.offset <= 1)  {
      this.offset = 1;
    }
    this.emitPageChange();
  }

  next() {
    this.offset = this.endIndex + 1;
    this.endIndex = this.endIndex + this.recordsPerPage;
    if (this.endIndex >= this.totalRecords)  {
      this.endIndex = this.totalRecords;
    }
    this.emitPageChange();
  }

  disable() {
    this.shouldDisablePrevious = this.offset <= 1 ? true : false;
    this.shouldDisableNext = this.endIndex >= this.totalRecords ? true : false;
  }

  emitPageChange() {
    this.disable();
    this.pageChange.emit({
      offset: this.offset,
      endIndex: this.endIndex,
    });
  }
}
