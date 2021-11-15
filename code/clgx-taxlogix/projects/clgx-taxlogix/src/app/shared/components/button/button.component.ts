import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  btnType!: string | '';
  @Input()
  btnSize!: string | '';
  @Input()
  btnText!: string | '';
  @Input() btnData: any;
  @Input() isRounded = false;
  @Input() btnDisabled = false;
  @Input() fullWidth = false;
  @Output() onbtnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onbtnClick.emit(this.btnData);
  }
}
