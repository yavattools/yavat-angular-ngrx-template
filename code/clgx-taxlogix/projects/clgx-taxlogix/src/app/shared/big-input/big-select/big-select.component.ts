import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'clgx-big-select',
  templateUrl: './big-select.component.html',
  styleUrls: ['./big-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigSelectComponent {
  @Output()
  blur = new EventEmitter<any>();

  @Output()
  keydown = new EventEmitter<any>();

  @Input()
  placeholder = '';

  @Input()
  options = [];

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
