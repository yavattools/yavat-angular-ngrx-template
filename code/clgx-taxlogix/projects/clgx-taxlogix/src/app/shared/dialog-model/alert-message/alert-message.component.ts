import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty } from 'lodash-es';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  progressbarValue = 100;
  color!: string;
  message!: string;
  alertType!: string;
  intervalSub!: Subscription;

  constructor(
    public matDialogRef: MatDialogRef<AlertMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.alertType = this.data.alertType;
    this.message = this.data.message;
    if (this.alertType === 'success') {
      this.color = '#1FFFE4';
      this.startTimer();
    } else if (this.data.alertType === 'error') {
      this.color = '#F51618';
    } else if (this.data.alertType === 'warning') {
      this.color = '#F6BE22';
    } else if (this.data.alertType === 'unsave-confirm') {
      this.color = '#F6BE22';
    }
  }

  //20 sec impl
  startTimer() {
    const timer$ = interval(75);
    let counter = 0;
    this.intervalSub = timer$.subscribe((sec) => {
      counter = counter + 0.5;
      this.progressbarValue = 100 - counter;

      if (this.progressbarValue === 0) {
        this.intervalSub.unsubscribe();
        this.matDialogRef.close();
      }
    });
  }

  closeDialog() {
    if (!isEmpty(this.intervalSub)) {
      this.intervalSub.unsubscribe();
    }
    this.matDialogRef.close();
  }

  submitDialog(event: any) {
    this.matDialogRef.close(event);
  }
}
