import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'clgx-big-input',
  templateUrl: './big-input.component.html',
  styleUrls: ['./big-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigInputComponent {
  @Output()
  blur = new EventEmitter<any>();

  @Output()
  keydown = new EventEmitter<any>();

  @Input()
  placeholder = '';

  @Input()
  value = '';

  @Input()
  disabled = false;

  @Input()
  showClear = false;

  hasFocus = false;

  clearTextHandler($event: MouseEvent) {
    this.value = '';
  }
}
