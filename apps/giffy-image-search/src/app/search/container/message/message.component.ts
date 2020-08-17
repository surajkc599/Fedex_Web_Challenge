import { Component, OnInit, Input } from '@angular/core';
import { IContentState } from '@fedex/data';

/**
 * Component that is responsible for showing messages.
 * 1. If empty response
 * 2. If the text is profanity
 * 3. If error occurs
 * 4. show loader
 */
@Component({
  selector: 'fedex-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message: IContentState;
}
