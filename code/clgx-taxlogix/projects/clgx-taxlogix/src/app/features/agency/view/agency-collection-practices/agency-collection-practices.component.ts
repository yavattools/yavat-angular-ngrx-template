import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator/paginator';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import {MatTableDataSource} from '@angular/material/table';
import { AgencyFeature, agencies } from '../../agency-view.data';
export interface Element {
  frequency: string;
  year:  number;
  installment:  number;
  base: string;
  discount: string;
  penalty: string;
  lateRelease: string;
  billRequest: string;
  
}

const ELEMENT_DATA: Element[] = [
  {frequency: 'Quaterly',year:2021,installment:1,base:'2/8/2021',discount:'none',penalty:'3/1/2021',lateRelease:'none',billRequest:'12/31/2021'},
  {frequency: 'Quaterly',year:2021,installment:2,base:'4/15/2021',discount:'none',penalty:'4/16/2021',lateRelease:'none',billRequest:'1/16/2021'},
  {frequency: 'Quaterly',year:2021,installment:3,base:'7/15/2021',discount:'none',penalty:'7/16/2021',lateRelease:'none',billRequest:'3/15/2021'},
  {frequency: 'Quaterly',year:2021,installment:4,base:'9/12/2021',discount:'none',penalty:'9/16/2021',lateRelease:'none',billRequest:'6/12/2021'},
  {frequency: 'Quaterly',year:2021,installment:1,base:'2/8/2021',discount:'none',penalty:'3/1/2021',lateRelease:'none',billRequest:'12/31/2021'},
  
 
 
];
@Component({
  selector: 'clgx-agency-collection-practices',
  templateUrl: './agency-collection-practices.component.html',
  styleUrls: ['./agency-collection-practices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyCollectionPracticesComponent implements OnInit {
  displayedColumns :string[]=['frequency', 'year', 'installment', 'base','discount','penalty','lateRelease','billRequest','action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator, { static: true })
  // paginator!: MatPaginator;

  // firstTwoRows: PeriodicElement[] = [];
 dataSource = ELEMENT_DATA;
 


 

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;

  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService){
    // this.firstTwoRows = [
    //   {frequency: 'Quaterly',year:2021,installment:3,base:'7/15/2021',discount:'none',penalty:'7/16/2021',lateRelease:'none',billRequest:'3/15/2021'},
    //   {frequency: 'Quaterly',year:2021,installment:4,base:'9/12/2021',discount:'none',penalty:'9/16/2021',lateRelease:'none',billRequest:'6/12/2021'},
     
      
    // ];
    //     this.dataSource.shift();
    //     this.dataSource.shift();
  }
  
  editDeal(element:Element){

  }
  
 
  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
