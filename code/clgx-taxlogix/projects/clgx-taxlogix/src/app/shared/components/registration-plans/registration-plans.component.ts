import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { LetsconnectDialogComponent } from '@app/shared/dialog-model/letsconnect-dialog/letsconnect-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-registration-plans',
  templateUrl: './registration-plans.component.html',
  styleUrls: ['./registration-plans.component.scss']
})
export class RegistrationPlansComponent implements OnInit, AfterViewInit {
  animal: string | undefined;
  name!: string;
  @Input() registartionPlans: any;
  @Output() selectedPlan = new EventEmitter();
  stylesObj: any = [];
  @ViewChildren('featureBox') featureBox: QueryList<ElementRef> | undefined;

  constructor(private renderer: Renderer2, private dialog: MatDialog) {}

  ngOnInit(): void {
    for (const element of this.registartionPlans) {
      const obj = {
        customStyle: 'flat',
        buttonText: 'SELECT',
        boxStyle: ''
      };
      this.stylesObj.push(obj);
    }
  }

  ngAfterViewInit() {
    let arr = [];
    if (this.featureBox) {
      for (let element of this.featureBox) {
        arr.push(element.nativeElement.getBoundingClientRect().height);
      }
      arr.sort(function (a, b) {
        return b - a;
      });
      for (let element of this.featureBox) {
        this.renderer.setStyle(element.nativeElement, 'height', arr[0] + 'px');
      }
    }
  }

  selectPlan(selectedPlan: any) {
    this.selectedPlan.emit(this.registartionPlans[selectedPlan]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LetsconnectDialogComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
}
