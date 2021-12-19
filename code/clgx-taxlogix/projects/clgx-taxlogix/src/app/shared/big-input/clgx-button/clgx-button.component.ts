import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'clgx-button',
  templateUrl: './clgx-button.component.html',
  styleUrls: ['./clgx-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClgxButtonComponent implements OnInit, OnChanges {
  @Output()
  clgClick = new EventEmitter<MouseEvent>();

  @Input()
  titleLabel = 'button';

  @Input()
  disabled = false;

  
  @Input()
  width = 0;

  elementWidth: number = 100;

  ngOnInit(): void {
      
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(!this.width){
        this.elementWidth = 100;
      }else{
        this.elementWidth = this.width;
      }
  }

  clickHandler($event: MouseEvent) {
    if(!this.disabled){
      this.clgClick.emit($event);
    }
  }
}
