import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import {MatTableDataSource} from '@angular/material/table';
import { AgencyFeature, agencies } from '../../agency-view.data';
import { AgencyDataService } from '@app/core/store/agency/agency-data-api.service';
import { CollectionDates } from '@app/core/store/agency/agency.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditAgencyCollectionPracticeComponent } from './edit-agency-collection-practice/edit-agency-collection-practice.component';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Observable } from 'rxjs';

export interface DialogData {
  data: CollectionDates;
}

@Component({
  selector: 'clgx-agency-collection-practices',
  templateUrl: './agency-collection-practices.component.html',
  styleUrls: ['./agency-collection-practices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyCollectionPracticesComponent implements OnInit {
  displayedColumns :string[]=['frequency', 'year', 'installment', 'base','discount','penalty','lateRelease','billRequest','action'];
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;
  
  currentDataSource = new MatTableDataSource<CollectionDates>();
  currentTablelength = 0;
  currentPageSize = 0;

  @ViewChild('currentPaginator', { read: MatPaginator })
  currentPaginator!: MatPaginator;
  collectionDates$ : Observable<CollectionDates[]>
  historyDataSource = new MatTableDataSource<CollectionDates>();
  historyTablelength = 0;
  historyPageSize = 0;
  historyPageSizeOptions = [5, 10, 25, 100];
  @ViewChild('historyPaginator', { read: MatPaginator })
  historyPaginator!: MatPaginator;


  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService, private apiDataService: AgencyDataService,public dialog: MatDialog,
    private agencyStoreFacade : AgencyStoreFacade){
      this.collectionDates$ = this.agencyStoreFacade.collectionDates$;
      this.agencyStoreFacade.getCollectionDates({agencyMasterId : '1', userId : '1',processId:'1'})
  }
  
  editDeal(element:CollectionDates){   
      const dialogRef = this.dialog.open(EditAgencyCollectionPracticeComponent, {
        width: '600px',
        data: element
      });
      this.agencyStoreFacade.setCollectionDate(element);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');        
      });
  }
  
  
   
  ngOnInit() {
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.collectionDates$.subscribe(data=>{
      // this.currentDataSource.data = data as Array<CollectionDates>;
      this.currentDataSource.data = (data as Array<CollectionDates>).slice(0, 4);

      this.historyDataSource.data = data as Array<CollectionDates>;
    })
    this.currentDataSource.paginator = this.currentPaginator;
    this.currentTablelength = this.currentDataSource.data.length;
    this.currentPageSize = 4; 

    this.historyDataSource.paginator = this.historyPaginator;
    this.historyTablelength = this.historyDataSource.data.length;
    this.historyPageSize = 5; 
  }
 
  ngAfterViewInit(): void {
    this.currentDataSource.paginator = this.currentPaginator;
    this.historyDataSource.paginator = this.historyPaginator;
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
