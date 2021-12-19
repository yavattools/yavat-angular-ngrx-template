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
  selector: 'clgx-reactive-input',
  templateUrl: './clgx-reactive-input.component.html',
  styleUrls: ['./clgx-reactive-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ClgxReactiveInputComponent implements OnInit {
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

  @Input() parentForm!:FormGroup;

  childForm: FormGroup = new FormGroup({});

  constructor(){}

  ngOnInit(): void {
   
  }

  clearTextHandler($event: MouseEvent) {
    // this.changeValue.emit('');
  }

}
