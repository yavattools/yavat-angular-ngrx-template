import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'clgx-input',
  templateUrl: './clgx-input.component.html',
  styleUrls: ['./clgx-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClgxInputComponent {
  @Output()
  blur = new EventEmitter<any>();

  @Output()
  keydown = new EventEmitter<any>();

  @Input()
  placeholder = '';

  @Input()
  titleLabel = 'label';

  @Input()
  value = '';

  @Output()
  changeValue = new EventEmitter<any>();

  @Input()
  disabled = false;

  @Input()
  showClear = false;

  @Input()
  required = false;

  @Input()
  controlName: FormControl = new FormControl(['', Validators.required]);

  hasFocus = false;

  clearTextHandler($event: MouseEvent) {
    this.value = '';
    this.changeValue.emit('');
  }

  modelChangeFn(value: any) {
    this.changeValue.emit(value);
  }
}
