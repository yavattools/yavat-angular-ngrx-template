import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'clgx-button',
  templateUrl: './clgx-button.component.html',
  styleUrls: ['./clgx-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClgxButtonComponent {
  @Output()
  click = new EventEmitter<MouseEvent>();

  @Input()
  titleLabel = 'button';

  @Input()
  disabled = false;

  clickHandler($event: MouseEvent) {
    this.click.emit($event);
  }
}
