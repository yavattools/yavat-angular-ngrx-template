import { SelectionChange } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import {
  CollectionDates,
  EditFrequencyType,
  FrequencyType
} from '@app/core/store/agency/agency.model';
import { DialogData } from '@app/shared/components/registration-plans/registration-plans.component';
import { from, Observable } from 'rxjs';
import { AgencyCollectionPracticesComponent } from '../agency-collection-practices.component';

export interface frequencys {
  id: string;
  frequency: string;
}

@Component({
  selector: 'clgx-edit-agency-collection-practice',
  templateUrl: './edit-agency-collection-practice.component.html',
  styleUrls: ['./edit-agency-collection-practice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAgencyCollectionPracticeComponent implements OnInit {
  collectionDates$: Observable<CollectionDates[]>;
  collectionHistoryDates$: Observable<CollectionDates[]>;
  collectionDates!: CollectionDates[];
  years: any[] = [];
  // ['1990','1991','1992','1993','1994','1995','1996','1997','1998',
  // '1999','2000','2001','2002','2003','2004','2005','2006','2007','2008',
  // '2009','2010','2011','2012','2013','2014','2015','2016','2017','2018',
  // '2019','2020','2021']
  installmentsValues: number[] = [];
  frequency: frequencys[] = [
    { id: 'annual', frequency: 'Annual' },
    { id: 'discountAnnual', frequency: 'Discount Annual' },
    { id: 'semiAnnual', frequency: 'Semi Annual' },
    { id: 'tri', frequency: 'Tri' },
    { id: 'quarterly', frequency: 'Quarterly' }
  ];
  collectionDate: CollectionDates = new CollectionDates();
  newCollectionDateForm: any;
  description: string = '';
  agencyMasterId: string | undefined;
  yearFC = new FormControl(+new Date().getFullYear(), [Validators.required]);
  installmentFC = new FormControl('', [Validators.required]);
  frequencyFC = new FormControl('', [Validators.required]);
  baseFC = new FormControl('', [Validators.required]);
  discountFC = new FormControl('', [Validators.required]);
  penaltyFC = new FormControl('', [Validators.required]);
  lateReleaseFC = new FormControl('', [Validators.required]);
  billRequestFC = new FormControl('', [Validators.required]);
  editForm: FormGroup = this.fb.group({
    year: this.yearFC,
    installment: this.installmentFC,
    frequency: this.frequencyFC,
    base: this.baseFC,
    discount: this.discountFC,
    penalty: this.penaltyFC,
    lateRelease: this.lateReleaseFC,
    billRequest: this.billRequestFC
  });

  constructor(
    public dialogRef: MatDialogRef<AgencyCollectionPracticesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private agencyStoreFacade: AgencyStoreFacade,
    private fb: FormBuilder
  ) {
    this.collectionDates$ = this.agencyStoreFacade.collectionDates$;
    this.collectionHistoryDates$ =
      this.agencyStoreFacade.collectionHistoryDates$;
  }

  ngOnInit(): void {
    this.collectionDates$.subscribe((data) => {
      this.collectionDates = [...data];
      data.map((collectionDate) => {
        if (
          this.years.includes(
            collectionDate.collectionYear ? collectionDate.collectionYear : '0'
          )
        ) {
          this.years.filter((e) => e !== collectionDate.collectionYear);
        }
      });
    });
    this.loadYears();
    this.agencyStoreFacade.selectedCollectionDate$.subscribe(
      (collectionDate) => {
        this.collectionDate = collectionDate;
        debugger;
        if (collectionDate && collectionDate.collectionYear) {
          this.editForm.controls['year'].setValue(
            +collectionDate.collectionYear
          );
          this.editForm.controls['year'].disable();

          this.editForm.controls['installment'].setValue(
            +collectionDate.collectionInstallment
          );
          let freq = this.getFrequency(collectionDate.collectionFrequency);
          if (freq === EditFrequencyType.ANNUAL) {
            if (+collectionDate.collectionInstallment == 1) {
              this.editForm.controls['installment'].disable();
            }
          } else if (freq === EditFrequencyType.DISCOUNT_ANNUAL) {
            if (+collectionDate.collectionInstallment == 1) {
              this.editForm.controls['installment'].disable();
            }
          } else if (freq === EditFrequencyType.QUARTERLY) {
            let records: CollectionDates[] = this.collectionDates.filter(
              (cd) => +cd.collectionYear === +collectionDate.collectionYear
            );
            for (let i = 0; i < 4; i++) {
              let ins = records.filter((r) => +r.collectionInstallment === i);
              if (!ins) {
                this.installmentsValues.push(i);
              }
            }
          } else if (freq === EditFrequencyType.SEMI_ANNUAL) {
            let records: CollectionDates[] = this.collectionDates.filter(
              (cd) => +cd.collectionYear === +collectionDate.collectionYear
            );
            for (let i = 0; i < 2; i++) {
              let ins = records.filter((r) => +r.collectionInstallment === i);
              if (!ins) {
                this.installmentsValues.push(i);
              }
            }
          } else if (freq === EditFrequencyType.TRI) {
            let records: CollectionDates[] = this.collectionDates.filter(
              (cd) => +cd.collectionYear === +collectionDate.collectionYear
            );

            for (let i = 0; i < 3; i++) {
              let ins = records.filter((r) => +r.collectionInstallment === i);
              if (!ins) {
                this.installmentsValues.push(i);
              }
            }
          }
          this.editForm.controls['frequency'].setValue(freq);

          // if (collectionDate.collectionFrequency) {
          //   this.editForm.controls['frequency'].disable();
          // }
          this.editForm.controls['base'].setValue(
            new Date(collectionDate.collectionBase)
          );
          this.editForm.controls['discount'].setValue(
            new Date(collectionDate.collectionDiscount)
          );
          this.editForm.controls['penalty'].setValue(
            new Date(collectionDate.collectionPenalty)
          );
          this.editForm.controls['lateRelease'].setValue(
            new Date(collectionDate.collectionLastRelease)
          );
          this.editForm.controls['billRequest'].setValue(
            new Date(collectionDate.collectionBillRequest)
          );
        } else {
          let cYear = +new Date().getFullYear();
          this.editForm.controls['year'].setValue(+new Date().getFullYear());
          // Find all records fro the Current year
          // find out frequency of the first row
          //  based on frequency - check number of records.
          //  if number of records matches to expeced then
          // set frequency and disable installment option as no more instllaments allowed.
          //  if number of records less than expected installments
          // set selected freq and disable and find the left over instllments and load to installment dropdown.
          // this logic need to do on year selection also.

          let records: CollectionDates[] = this.collectionDates.filter(
            (cd) => +cd.collectionYear === cYear
          );
          if (records && records.length) {
            let cFreq = this.getFrequency(records[0].collectionFrequency);
            this.editForm.controls['frequency'].setValue(cFreq);
            // this.editForm.controls['frequency'].disable();
            if (cFreq === EditFrequencyType.ANNUAL) {
              this.editForm.controls['installment'].disable();
            } else if (cFreq === EditFrequencyType.DISCOUNT_ANNUAL) {
              this.editForm.controls['installment'].disable();
            } else if (cFreq === EditFrequencyType.QUARTERLY) {
              for (let i = 1; i < 5; i++) {
                let ins = records.filter((r) => +r.collectionInstallment === i);
                if (!ins) {
                  this.installmentsValues.push(i);
                }
              }
            } else if (cFreq === EditFrequencyType.SEMI_ANNUAL) {
              for (let i = 1; i < 3; i++) {
                let ins = records.filter((r) => +r.collectionInstallment === i);
                if (!ins) {
                  this.installmentsValues.push(i);
                }
              }
            } else if (cFreq === EditFrequencyType.TRI) {
              for (let i = 1; i < 4; i++) {
                let ins = records.filter((r) => +r.collectionInstallment === i);
                if (!ins || (ins && ins.length == 0) ) {
                  this.installmentsValues.push(i);
                }
              }
            
            }
          } else {
            this.editForm.controls['installment'].disable();
          }
          if(this.installmentsValues.length){
            this.editForm.controls['installment'].enable();
          }
        }
      }
    );
    this.agencyStoreFacade.selectedAgency$.subscribe((data) => {
      this.agencyMasterId = data.agencyMasterId;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadYears() {
    let currentYear = +new Date().getFullYear();
    // for(let i = 0; i < 30; i++){
    //   this.years.push(currentYear + i);
    // }
    for (let i = 0; i < 20; i++) {
      this.years.push(currentYear - i);
    }
  }

  yearSelectionChanged($event: MatSelectChange) {
    console.log('year selected ' + $event.value);
    // this.editForm.controls['frequency'].enable();
    // this.editForm.controls['installment'].enable();
    let records: CollectionDates[] = this.collectionDates.filter(
      (cd) => +cd.collectionYear === $event.value
    );
    if (records && records.length) {
      let cFreq = this.getFrequency(records[0].collectionFrequency);
      this.editForm.controls['frequency'].setValue(cFreq);
      this.editForm.controls['frequency'].disable();
      if (cFreq === EditFrequencyType.ANNUAL) {
        this.editForm.controls['installment'].disable();
      } else if (cFreq === EditFrequencyType.DISCOUNT_ANNUAL) {
        this.editForm.controls['installment'].disable();
      } else if (cFreq === EditFrequencyType.QUARTERLY) {
        for (let i = 0; i < 4; i++) {
          let ins = records.filter((r) => +r.collectionInstallment === i);
          if (!ins) {
            this.installmentsValues.push(i);
          }
        }
      } else if (cFreq === EditFrequencyType.SEMI_ANNUAL) {
        for (let i = 0; i < 2; i++) {
          let ins = records.filter((r) => +r.collectionInstallment === i);
          if (!ins) {
            this.installmentsValues.push(i);
          }
        }
      } else if (cFreq === EditFrequencyType.TRI) {
        for (let i = 0; i < 3; i++) {
          let ins = records.filter((r) => +r.collectionInstallment === i);
          if (!ins) {
            this.installmentsValues.push(i);
          }
        }
      }
    } else {
      this.editForm.controls['installment'].enable();
      this.editForm.controls['frequency'].enable();
      this.frequencyValue();
      this.editForm.controls['installment'].setValue(1);
      //   let freq = this.getFrequency(this.collectionDate.collectionFrequency);
      //   if(freq === EditFrequencyType.ANNUAL){
      //     if(+this.collectionDate.collectionInstallment == 1){
      //       this.editForm.controls['installment'].disable();
      //     }
      //   }else if(freq === EditFrequencyType.DISCOUNT_ANNUAL){
      //     if(+this.collectionDate.collectionInstallment == 1){
      //       this.editForm.controls['installment'].disable();
      //     }
      //   }else if(freq === EditFrequencyType.QUARTERLY){
      //     let records:CollectionDates[]  = this.collectionDates.filter(cd => +cd.collectionYear === +this.collectionDate.collectionYear);
      //     for(let i = 0; i < 4; i++){
      //       let ins = records.filter(r => +r.collectionInstallment === i);
      //       if(!ins){
      //         this.installmentsValues.push(i.toString());
      //       }
      //     }
      //     }else if(freq === EditFrequencyType.SEMI_ANNUAL){
      //     let records:CollectionDates[]  = this.collectionDates.filter(cd => +cd.collectionYear === +this.collectionDate.collectionYear);
      //       for(let i = 0; i < 2; i++){
      //         let ins = records.filter(r => +r.collectionInstallment === i);
      //         if(!ins){
      //           this.installmentsValues.push(i.toString());
      //         }
      //       }
      //   }else if (freq === EditFrequencyType.TRI){
      //     let records:CollectionDates[]  = this.collectionDates.filter(cd => +cd.collectionYear === +this.collectionDate.collectionYear);

      //     for(let i = 0; i < 3; i++){
      //       let ins = records.filter(r => +r.collectionInstallment === i);
      //       if(!ins){
      //         this.installmentsValues.push(i.toString());
      //       }
      //     }
      // }
      // this.editForm.controls['frequency'].setValue(freq);

      // if(this.collectionDate.collectionFrequency){
      //   this.editForm.controls['frequency'].disable();
      // }
    }
  }

  updateCollectionDate(form: FormGroup) {
    this.newCollectionDateForm = new CollectionDates();
    if (form.controls['year'].value !== this.collectionDate.collectionYear) {
      this.addToDescription(
        this.collectionDate.collectionYear,
        form.controls['year'].value,
        'Collection Year'
      );
    }
    if (
      form.controls['installment'].value !==
      this.collectionDate.collectionInstallment
    ) {
      this.addToDescription(
        this.collectionDate.collectionInstallment,
        form.controls['installment'].value,
        'Collection Installment'
      );
    }
    if (
      form.controls['frequency'].value !==
      this.getFrequency(this.collectionDate.collectionFrequency)
    ) {
      this.addToDescription(
        this.collectionDate.collectionFrequency,
        form.controls['frequency'].value,
        'Collection Frequency'
      );
    }
    if (
      form.controls['base'].value !==
      new Date(this.collectionDate.collectionBase)
    ) {
      this.addToDescription(
        this.collectionDate.collectionBase,
        form.controls['base'].value,
        'Collection Base'
      );
    }
    if (
      form.controls['discount'].value !==
      new Date(this.collectionDate.collectionDiscount)
    ) {
      this.addToDescription(
        this.collectionDate.collectionDiscount,
        form.controls['discount'].value,
        'Collection Discount'
      );
    }
    if (
      form.controls['penalty'].value !==
      new Date(this.collectionDate.collectionPenalty)
    ) {
      this.addToDescription(
        this.collectionDate.collectionPenalty,
        form.controls['penalty'].value,
        'Collection Penalty'
      );
    }
    if (
      form.controls['lateRelease'].value !==
      new Date(this.collectionDate.collectionLastRelease)
    ) {
      this.addToDescription(
        this.collectionDate.collectionLastRelease,
        form.controls['lateRelease'].value,
        'Collection Late Release'
      );
    }
    if (
      form.controls['billRequest'].value !==
      new Date(this.collectionDate.collectionBillRequest)
    ) {
      this.addToDescription(
        this.collectionDate.collectionBillRequest,
        form.controls['billRequest'].value,
        'Collection Bill Request'
      );
    }
    this.newCollectionDateForm.collectionYear = form.controls['year'].value;
    this.newCollectionDateForm.collectionInstallment =
      form.controls['installment'].value;
    this.newCollectionDateForm.collectionFrequency = this.getFrequencyValue();
    this.newCollectionDateForm.collectionBase = new Date(
      form.controls['base'].value
    )
      .toLocaleDateString('en-US')
      .split('/')
      .join('-');
    this.newCollectionDateForm.collectionDiscount = new Date(
      form.controls['discount'].value
    )
      .toLocaleDateString('en-US')
      .split('/')
      .join('-');
    this.newCollectionDateForm.collectionPenalty = new Date(
      form.controls['penalty'].value
    )
      .toLocaleDateString('en-US')
      .split('/')
      .join('-');
    this.newCollectionDateForm.collectionLastRelease = new Date(
      form.controls['lateRelease'].value
    )
      .toLocaleDateString('en-US')
      .split('/')
      .join('-');
    this.newCollectionDateForm.collectionBillRequest = new Date(
      form.controls['billRequest'].value
    )
      .toLocaleDateString('en-US')
      .split('/')
      .join('-');

    this.newCollectionDateForm.agencyCollectionDatesId = this.collectionDate
      .agencyCollectionDatesId
      ? this.collectionDate.agencyCollectionDatesId
      : '';
    this.newCollectionDateForm.agencyMasterId = this.agencyMasterId;
    this.newCollectionDateForm.createdBy = this.collectionDate.createdBy
      ? this.collectionDate.createdBy
      : '';
    this.newCollectionDateForm.modifiedBy = this.collectionDate.modifiedBy
      ? this.collectionDate.modifiedBy
      : '';
    this.newCollectionDateForm.createdByUser = this.collectionDate.createdByUser
      ? this.collectionDate.createdByUser
      : '';
    this.newCollectionDateForm.modifiedByUser = this.collectionDate
      .modifiedByUser
      ? this.collectionDate.modifiedByUser
      : '';
    this.newCollectionDateForm.isDeleted = this.collectionDate.isDeleted
      ? this.collectionDate.isDeleted
      : '';
    if (this.collectionDate.agencyCollectionDatesId) {
      this.newCollectionDateForm.description = this.description;
      this.agencyStoreFacade.updateCollectionDates(this.newCollectionDateForm);
    } else {
      this.agencyStoreFacade.saveCollectionDates(this.newCollectionDateForm);
    }
    this.dialogRef.close();
  }

  isRequired(name: string): boolean {
    return this.editForm.get(name)?.hasValidator(Validators.required) ?? false;
  }
  frequencyValue() {
    this.editForm.controls['installment'].enable();
    if (this.editForm.controls['frequency'].value === 'annual') {
      this.installmentsValues = [1];
    } else if (this.editForm.controls['frequency'].value === 'discountAnnual') {
      this.installmentsValues = [1];
    } else if (this.editForm.controls['frequency'].value === 'semiAnnual') {
      this.installmentsValues = [1, 2];
    } else if (this.editForm.controls['frequency'].value === 'tri') {
      this.installmentsValues = [1, 2, 3];
    } else if (this.editForm.controls['frequency'].value === 'quarterly') {
      this.installmentsValues = [1, 2, 3, 4];
    } else {
      this.editForm.controls['installment'].disable();
    }
  }

  getFrequencyValue() {
    let result = '';
    if (this.editForm.controls['frequency'].value == 'annual') {
      result = '1';
    } else if (this.editForm.controls['frequency'].value == 'discountAnnual') {
      result = '2';
    } else if (this.editForm.controls['frequency'].value == 'semiAnnual') {
      result = '3';
    } else if (this.editForm.controls['frequency'].value == 'tri') {
      result = '4';
    } else if (this.editForm.controls['frequency'].value == 'quarterly') {
      result = '5';
    }
    return result;
  }

  getFrequency(value: string | undefined) {
    let result = null;
    if (value == '1') {
      result = 'annual';
    } else if (value == '2') {
      result = 'discountAnnual';
    } else if (value == '3') {
      result = 'semiAnnual';
    } else if (value == '4') {
      result = 'tri';
    } else if (value == '5') {
      result = 'quarterly';
    }
    return result;
  }

  addToDescription(oldValue: any, newValue: any, fieldname: string) {
    this.description +=
      fieldname + ' is updated from ' + oldValue + ' to ' + newValue + '; ';
  }
}
