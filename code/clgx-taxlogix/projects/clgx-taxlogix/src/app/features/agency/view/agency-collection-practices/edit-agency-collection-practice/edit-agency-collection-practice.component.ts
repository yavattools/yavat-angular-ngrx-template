import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { CollectionDates } from '@app/core/store/agency/agency.model';
import { DialogData } from '@app/shared/components/registration-plans/registration-plans.component';
import { AgencyCollectionPracticesComponent } from '../agency-collection-practices.component';

@Component({
  selector: 'clgx-edit-agency-collection-practice',
  templateUrl: './edit-agency-collection-practice.component.html',
  styleUrls: ['./edit-agency-collection-practice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAgencyCollectionPracticeComponent implements OnInit {

  collectionDate : CollectionDates = new CollectionDates
  newCollectionDateForm : any
  yearFC = new FormControl('',[Validators.required]);
  installmentFC = new FormControl('',[Validators.required]);
  baseFC = new FormControl('',[Validators.required]);
  discountFC = new FormControl('',[Validators.required]);
  penaltyFC = new FormControl('',[Validators.required]);
  lateReleaseFC = new FormControl('',[Validators.required]);
  billRequestFC = new FormControl('',[Validators.required]);
  editForm : FormGroup = this.fb.group({
    year : this.yearFC,
    installment : this.installmentFC,
    base : this.baseFC,
    discount : this.discountFC,
    penalty : this.penaltyFC,
    lateRelease : this.lateReleaseFC,
    billRequest : this.billRequestFC
  })

  constructor(
    public dialogRef: MatDialogRef<AgencyCollectionPracticesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private agencyStoreFacade : AgencyStoreFacade,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.agencyStoreFacade.selectedCollectionDate$.subscribe(collectionDate =>{
      this.collectionDate = collectionDate;
      if(collectionDate){
        this.editForm.controls['year'].setValue(collectionDate.year);
        this.editForm.controls['installment'].setValue(collectionDate.installment);
        this.editForm.controls['base'].setValue(collectionDate.base);
        this.editForm.controls['discount'].setValue(collectionDate.discount);
        this.editForm.controls['penalty'].setValue(collectionDate.penalty);
        this.editForm.controls['lateRelease'].setValue(collectionDate.lateRelease);
        this.editForm.controls['billRequest'].setValue(collectionDate.billRequest);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCollectionDate(form : FormGroup){
    this.newCollectionDateForm = new CollectionDates();
    this.newCollectionDateForm.year = form.controls['year'].value;
    this.newCollectionDateForm.installment = form.controls['installment'].value;
    this.newCollectionDateForm.base = form.controls['base'].value;
    this.newCollectionDateForm.discount = form.controls['discount'].value;
    this.newCollectionDateForm.penalty = form.controls['penalty'].value;
    this.newCollectionDateForm.lateRelease = form.controls['lateRelease'].value;
    this.newCollectionDateForm.billRequest = form.controls['billRequest'].value;
    this.newCollectionDateForm.collectionPracticesId = this.collectionDate.collectionPracticesId;
    this.newCollectionDateForm.agencyMasterId = this.collectionDate.agencyMasterId;
    this.newCollectionDateForm.frequency = this.collectionDate.frequency;
    this.newCollectionDateForm.createdBy = this.collectionDate.createdBy;
    this.newCollectionDateForm.modifiedBy = this.collectionDate.modifiedBy;
    this.newCollectionDateForm.createdByUser = this.collectionDate.createdByUser;
    this.newCollectionDateForm.modifiedByUser = this.collectionDate.modifiedByUser;
    this.agencyStoreFacade.updateCollectionDates(this.newCollectionDateForm);
    this.dialogRef.close();
  }
}
