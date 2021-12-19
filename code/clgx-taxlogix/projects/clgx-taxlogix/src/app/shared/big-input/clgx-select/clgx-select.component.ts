import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'clgx-select',
  templateUrl: './clgx-select.component.html',
  styleUrls: ['./clgx-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ClgxSelectComponent {
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
  options: Array<any> = new Array<any>();

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
