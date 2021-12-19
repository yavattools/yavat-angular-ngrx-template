import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  forwardRef
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'clgx-reactive-date',
  templateUrl: './clgx-reactive-date.component.html',
  styleUrls: ['./clgx-reactive-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ClgxReactiveDateComponent implements OnInit {
  @Output()
  blur = new EventEmitter<any>();

  @Output()
  keydown = new EventEmitter<any>();

  @Input()
  placeholder = '';

  @Input()
  titleLabel = 'label';

  @Input()
  disabled = false;

  @Input()
  showClear = false;

  @Input()
  required = false;

  @Input()
  error = false;

  @Input()
  clgxControlName!: string;

  constructor(){}

  ngOnInit(): void {
   
  }

  clearTextHandler($event: MouseEvent) {
    // this.changeValue.emit('');
  }

}
