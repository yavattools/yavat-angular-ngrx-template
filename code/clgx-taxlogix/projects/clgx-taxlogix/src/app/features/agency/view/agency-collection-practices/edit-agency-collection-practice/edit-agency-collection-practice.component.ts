import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { CollectionDates } from '@app/core/store/agency/agency.model';
import { DialogData } from '@app/shared/components/registration-plans/registration-plans.component';
import { Observable } from 'rxjs';
import { AgencyCollectionPracticesComponent } from '../agency-collection-practices.component';

export interface frequencys{
  id : string,
  frequency : string
}

@Component({
  selector: 'clgx-edit-agency-collection-practice',
  templateUrl: './edit-agency-collection-practice.component.html',
  styleUrls: ['./edit-agency-collection-practice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAgencyCollectionPracticeComponent implements OnInit {

  collectionDates$ : Observable<CollectionDates[]>;
  collectionDates : any
  years : string[] = ['1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
  installmentsValues : string[] = []
  frequency  : frequencys[] = [
    {id : 'annual', frequency : 'Annual'},
    {id : 'discountAnnual', frequency : 'Discount Annual'},
    {id : 'semiAnnual', frequency : 'Semi Annual'},
    {id : 'tri', frequency : 'Tri'},
    {id : 'quarterly', frequency : 'Quarterly'}
  ]
  collectionDate : CollectionDates = new CollectionDates
  newCollectionDateForm : any
  agencyMasterId : string | undefined
  yearFC = new FormControl('',[Validators.required]);
  installmentFC = new FormControl('',[Validators.required]);
  frequencyFC = new FormControl('',[Validators.required]);
  baseFC = new FormControl('',[Validators.required]);
  discountFC = new FormControl('',[Validators.required]);
  penaltyFC = new FormControl('',[Validators.required]);
  lateReleaseFC = new FormControl('',[Validators.required]);
  billRequestFC = new FormControl('',[Validators.required]);
  editForm : FormGroup = this.fb.group({
    year : this.yearFC,
    installment : this.installmentFC,
    frequency : this.frequencyFC,
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
  ) {
    this.collectionDates$ = this.agencyStoreFacade.collectionDates$;
   }

  ngOnInit(): void {
    this.collectionDates$.subscribe(data=>{
      data.map((collectionDate)=>{
        if(this.years.includes(collectionDate.collectionYear?collectionDate.collectionYear : '0')){
          this.years.filter(e=> e !== collectionDate.collectionYear)
        }
      })
    });
    this.agencyStoreFacade.selectedCollectionDate$.subscribe(collectionDate =>{
      this.collectionDate = collectionDate;
      if(collectionDate){
        this.editForm.controls['year'].setValue(collectionDate.collectionYear);
        this.editForm.controls['installment'].setValue(collectionDate.collectionInstallment);
        this.editForm.controls['frequency'].setValue(collectionDate.collectionFrequency);
        this.editForm.controls['base'].setValue(new Date(collectionDate.collectionBase));
        this.editForm.controls['discount'].setValue(collectionDate.collectionDiscount);
        this.editForm.controls['penalty'].setValue(new Date(collectionDate.collectionPenalty));
        this.editForm.controls['lateRelease'].setValue(collectionDate.collectionLastRelease);
        this.editForm.controls['billRequest'].setValue(new Date(collectionDate.collectionBillRequest));
      }
    });
    this.agencyStoreFacade.selectedAgency$.subscribe(data=>{
      this.agencyMasterId = data.agencyMasterId;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCollectionDate(form : FormGroup){
    this.newCollectionDateForm = new CollectionDates();
    this.newCollectionDateForm.collectionYear = form.controls['year'].value;
    this.newCollectionDateForm.collectionInstallment = form.controls['installment'].value;
    this.newCollectionDateForm.collectionFrequency = form.controls['frequency'].value;
    this.newCollectionDateForm.collectionBase = new Date(form.controls['base'].value).toLocaleDateString("en-US").split('/').join('-');
    this.newCollectionDateForm.collectionDiscount =  new Date(form.controls['discount'].value).toLocaleDateString("en-US").split('/').join('-');
    this.newCollectionDateForm.collectionPenalty = new Date(form.controls['penalty'].value).toLocaleDateString("en-US").split('/').join('-');
    this.newCollectionDateForm.collectionLastRelease = new Date(form.controls['lateRelease'].value).toLocaleDateString("en-US").split('/').join('-');
    this.newCollectionDateForm.collectionBillRequest = new Date(form.controls['billRequest'].value).toLocaleDateString("en-US").split('/').join('-');
    
    this.newCollectionDateForm.agencyCollectionDatesId = this.collectionDate.agencyCollectionDatesId?this.collectionDate.agencyCollectionDatesId : '';
    this.newCollectionDateForm.agencyMasterId = this.agencyMasterId;
    this.newCollectionDateForm.createdBy = this.collectionDate.createdBy?this.collectionDate.createdBy : '';
    this.newCollectionDateForm.modifiedBy = this.collectionDate.modifiedBy?this.collectionDate.modifiedBy : '';
    this.newCollectionDateForm.createdByUser = this.collectionDate.createdByUser?this.collectionDate.createdByUser : '';
    this.newCollectionDateForm.modifiedByUser = this.collectionDate.modifiedByUser?this.collectionDate.modifiedByUser : '';
    this.newCollectionDateForm.isDeleted = this.collectionDate.isDeleted?this.collectionDate.isDeleted : '';
    if(this.collectionDate.agencyCollectionDatesId){
      this.agencyStoreFacade.updateCollectionDates(this.newCollectionDateForm);
    }else{
      this.agencyStoreFacade.saveCollectionDates(this.newCollectionDateForm);
    }
    this.dialogRef.close();
  }

  isRequired(name: string): boolean {
    return this.editForm.get(name)?.hasValidator(Validators.required) ?? false;
  }
  frequencyValue(){
    if(this.editForm.controls['frequency'].value === 'annual'){
      this.installmentsValues = ['1']
    }
    else if(this.editForm.controls['frequency'].value === 'discountAnnual'){
      this.installmentsValues = ['1']
    }
    else if(this.editForm.controls['frequency'].value === 'semiAnnual'){
      this.installmentsValues = ['1', '2']
    }
    else if(this.editForm.controls['frequency'].value === 'tri'){
      this.installmentsValues = ['1','2','3']
    }
    else if(this.editForm.controls['frequency'].value === 'quarterly'){
      this.installmentsValues = ['1','2','3','4']
    }
  }
}
