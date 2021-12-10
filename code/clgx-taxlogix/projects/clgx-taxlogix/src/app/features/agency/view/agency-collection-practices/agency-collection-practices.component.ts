import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { MatTableDataSource } from '@angular/material/table';
import { AgencyFeature, agencies } from '../../agency-view.data';
import { AgencyDataService } from '@app/core/store/agency/agency-data-api.service';
import { CollectionDates } from '@app/core/store/agency/agency.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditAgencyCollectionPracticeComponent } from './edit-agency-collection-practice/edit-agency-collection-practice.component';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Observable } from 'rxjs';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';

export class NGXFreqDataTableMessages {
  emptyMessage!: string;
  totalMessage!: string;
  selectedMessage!: string;

  constructor() {
    this.emptyMessage = 'No Collection Dates Found';
    this.totalMessage = 'Total Collection Dates';
  }
}

export interface DialogData {
  data: CollectionDates;
}

@Component({
  selector: 'clgx-agency-collection-practices',
  templateUrl: './agency-collection-practices.component.html',
  styleUrls: ['./agency-collection-practices.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyCollectionPracticesComponent implements OnInit {
  displayedColumns: string[] = [
    'frequency',
    'year',
    'installment',
    'base',
    'discount',
    'penalty',
    'lateRelease',
    'billRequest',
    'action'
  ];
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;
  timeout: any;

  currentDataSource = new MatTableDataSource<CollectionDates>();
  currentTablelength = 0;
  currentPageSize = 0;
  loginData: any;
  agencyMasterId: string | undefined;

  @ViewChild('currentPaginator', { read: MatPaginator })
  currentPaginator!: MatPaginator;
  // collectionDates$ : Observable<CollectionDates[]>
  // collectionDates! : Array<CollectionDates>;
  // collectionHistoryDates! : Array<CollectionDates>;

  historyDataSource = new MatTableDataSource<CollectionDates>();
  historyTablelength = 0;
  historyPageSize = 0;
  historyPageSizeOptions = [5, 10, 25, 100];
  @ViewChild('historyPaginator', { read: MatPaginator })
  historyPaginator!: MatPaginator;

  ngxCollectionDatesDisplayedColumns = [
    { name: 'collectionFrequency' },
    { name: 'collectionYear' },
    { name: 'collectionInstallment' },
    { name: 'collectionBase' },
    { name: 'collectionDiscount' },
    { name: 'collectionPenalty' },
    { name: 'collectionLastRelease' },
    { name: 'collectionBillRequest' }
  ];
  dataCollectionDatesTableMessage: NGXFreqDataTableMessages =
    new NGXFreqDataTableMessages();

  isMobile: boolean = false;
  constructor(
    public deviceService: DeviceDetectorService,
    private apiDataService: AgencyDataService,
    public dialog: MatDialog,
    public agencyStoreFacade: AgencyStoreFacade,
    public cd: ChangeDetectorRef,
    private authStoreFacade: AuthStoreFacade
  ) {
    // this.collectionDates$ = this.agencyStoreFacade.collectionDates$;
    this.authStoreFacade.loginProfile$.subscribe((data) => {
      this.loginData = data;
    });
    this.agencyStoreFacade.selectedAgency$.subscribe((data) => {
      this.agencyMasterId = data.agencyMasterId;
    });
    if (this.agencyMasterId) {
      this.agencyStoreFacade.getCollectionDates({
        userId: this.loginData.processOrgModel.userId,
        agencyMasterId: this.agencyMasterId,
        agencyCollectionDatesId: undefined
      });
    }

    // this.collectionDates = new Array<CollectionDates>();
    // this.collectionHistoryDates = new Array<CollectionDates>();
    // let cDates: Array<CollectionDates> = [];
    // let chDates: Array<CollectionDates> = [];

    // this.collectionDates$.subscribe(data=>{
    //   let collectionDatesData: Array<CollectionDates> = [...data];
    //   debugger;
    //   if(collectionDatesData && collectionDatesData.length){
    //     collectionDatesData.forEach(cd => {
    //       if(+cd.collectionYear === new Date().getFullYear()){
    //         cDates.push(cd);
    //       }else{
    //         chDates.push(cd);
    //       }
    //     })
    //   }
    // })
    // this.collectionHistoryDates = [...chDates];
    // this.collectionDates = [...cDates];
  }

  editDates($event: MouseEvent, element: CollectionDates) {
    const dialogRef = this.dialog.open(EditAgencyCollectionPracticeComponent, {
      width: '600px',
      data: element
    });
    this.agencyStoreFacade.setCollectionDate(element);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addCollectionDates($event: MouseEvent) {
    let neDates: CollectionDates = new CollectionDates();

    const dialogRef = this.dialog.open(EditAgencyCollectionPracticeComponent, {
      width: '600px',
      data: neDates
    });
    this.agencyStoreFacade.setCollectionDate(neDates);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getFreqLabel(value: number) {
    let result = 'Quarterly';
    switch (+value) {
      case 1: {
        result = 'Annual';
        break;
      }
      case 2: {
        result = 'Discount Annual';
        break;
      }
      case 3: {
        result = 'Semi Annual';
        break;
      }
      case 4: {
        result = 'Tri';
        break;
      }
      case 5: {
        result = 'Quarterly';
        break;
      }
    }

    return result;
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

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

  onPage(event: MouseEvent) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
}
