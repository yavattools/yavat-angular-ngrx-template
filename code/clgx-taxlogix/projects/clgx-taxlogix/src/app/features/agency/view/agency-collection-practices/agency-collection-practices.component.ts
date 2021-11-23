import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import {MatTableDataSource} from '@angular/material/table';
import { AgencyFeature, agencies } from '../../agency-view.data';
import { AgencyDataService } from '@app/core/store/agency/agency-data-api.service';
import { CollectionDates } from '@app/core/store/agency/agency.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



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
  
  historyDataSource = new MatTableDataSource<CollectionDates>();
  historyTablelength = 0;
  historyPageSize = 0;
  historyPageSizeOptions = [5, 10, 25, 100];
  @ViewChild('historyPaginator', { read: MatPaginator })
  historyPaginator!: MatPaginator;


  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService, private apiDataService: AgencyDataService){
  }
  
  editDeal(element:Element){

  }
   
  ngOnInit() {
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.getCurrentCollectionDates();
    this.getHistoryCollectionDates();
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


  getCurrentCollectionDates() {
     this.apiDataService.getCollectionsDates().subscribe(data => {
        this.currentDataSource.data = data as Array<CollectionDates>;
     })
  }

  getHistoryCollectionDates() {
    this.apiDataService.getCollectionsDates().subscribe(data => {
       this.historyDataSource.data = data as Array<CollectionDates>;
    })
 }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
