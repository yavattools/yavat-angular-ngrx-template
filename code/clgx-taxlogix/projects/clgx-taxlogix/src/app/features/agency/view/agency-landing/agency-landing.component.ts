import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterContentChecked,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { Agency } from '@app/core/store/agency/agency.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { first } from 'rxjs/operators';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';

export class AgencyFilter {
  name: string;
  number: string;
  state: string;

  constructor() {
    this.name = '';
    this.number = '';
    this.state = '';
  }
}

export class NGXDataTableMessages {
  emptyMessage!: string;
  totalMessage!: string;
  selectedMessage!: string;

  constructor() {
    this.emptyMessage = 'No Agencies Found';
    this.totalMessage = 'Total Agencies';
  }
}

@Component({
  selector: 'clgx-agency-landing',
  templateUrl: './agency-landing.component.html',
  styleUrls: ['./agency-landing.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyLandingComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies$: Observable<Agency[]>;
  agencies: Agency[] = [];
  filterAgencies: Agency[] = [];
  clickedRows = new Set<Agency>();
  agencyFilter: AgencyFilter;
  isMobile: Boolean = false;

  displayedColumns = [
    'agencyNumber',
    'agencyName',
    'agencySuitsAddress',
    'agencyCity',
    'assessorPhoneNumber',
    'actions'
  ];
  ngxDisplayedColumns = [
    { name: 'agencyNumber' },
    { name: 'agencyName' },
    { name: 'agencySuitsAddress' },
    { name: 'agencyCity' },
    { name: 'agencyState' },
    { name: 'assessorPhoneNumber' }
  ];
  agencyDataSource!: MatTableDataSource<Agency>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  dataTableMessage: NGXDataTableMessages;

  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  loginData: any;

  // ColumnMode = ColumnMode;

  constructor(
    public deviceService: DeviceDetectorService,
    public agencyFacade: AgencyStoreFacade,
    private cd: ChangeDetectorRef,
    public settingsFacadeService: SettingsStoreFacade,
    private router: Router,
    private authStoreFacade: AuthStoreFacade
  ) {
    this.dataTableMessage = new NGXDataTableMessages();
    this.dataTableMessage.emptyMessage = '';
    this.dataTableMessage.totalMessage = ' Agencies';
    this.authStoreFacade.loginProfile$.subscribe((data) => {
      this.loginData = data;
    });
    this.agencies$ = this.agencyFacade.agencies$;
    this.agencies$.pipe(first()).subscribe((agencies) => {
      if (!agencies.length) {
        this.agencyFacade.getAgencies({
          userId: this.loginData?.processOrgModel.userId,
          processId: this.loginData?.processOrgModel.processId,
          agencyMasterId: undefined
        });
        this.dataTableMessage.emptyMessage = '';
        this.dataTableMessage.totalMessage = ' Agencies';
      }
    });
    this.agencyFacade.getStateOptions();
    this.agencyFacade.getBillingRequest(
      this.loginData?.processOrgModel.processId,
      this.loginData?.processOrgModel.userId
    );
    this.agencyFacade.getMediaType(
      this.loginData?.processOrgModel.processId,
      this.loginData?.processOrgModel.userId
    );
    this.agencyFilter = new AgencyFilter();
  }

  ngOnInit() {
    this.agencies$.subscribe((agencies) => {
      debugger;
      this.agencies = [...agencies];
      this.filterAgencies = [...agencies];
      this.agencyDataSource = new MatTableDataSource(agencies);
    });
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    this.settingsFacadeService.setHeaderShowTime('always');
    setTimeout(() => {
      this.settingsFacadeService.showHeader();
    }, 100);
  }

  onPage(event: MouseEvent) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  clearNameFilter($event: MouseEvent) {
    $event.stopPropagation();
    this.agencyFilter.name = '';

    this.searchAgency($event);
  }

  clearStateFilter($event: MouseEvent) {
    $event.stopPropagation();
    this.agencyFilter.state = '';

    this.searchAgency($event);
  }

  clearNumberFilter($event: MouseEvent) {
    $event.stopPropagation();
    this.agencyFilter.name = '';

    this.searchAgency($event);
  }

  addNewAgency(event: MouseEvent) {
    let newAgency: Agency = new Agency();
    this.agencyFacade.setSelectedAgency(newAgency);
    this.router.navigateByUrl('/agency/agency-details');
  }

  navigateToDetails(event: MouseEvent, agency: Agency) {
    this.agencyFacade.setSelectedAgency(agency);
    this.router.navigateByUrl('/agency/agency-details');
  }

  ngAfterViewInit() {
    this.agencyDataSource.paginator = this.paginator;
    this.agencyDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.agencyDataSource.filter = filterValue.trim().toLowerCase();

    if (this.agencyDataSource.paginator) {
      this.agencyDataSource.paginator.firstPage();
    }
  }

  agenciesSortChange(sortState: Sort) {
    if (sortState.direction) {
      if (sortState.direction === 'asc') {
        this.filterAgencies = [
          ...this.agencies.sort((a: Agency, b: Agency) =>
            a.agencyNumber.localeCompare(b.agencyNumber)
          )
        ];
        this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
      } else {
        this.filterAgencies = [
          ...this.agencies.sort((a: Agency, b: Agency) =>
            b.agencyNumber.localeCompare(a.agencyNumber)
          )
        ];
        this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
      }
      this.cd ? this.cd.detectChanges() : '';
    } else {
      this.filterAgencies = [...this.agencies];
      this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
    }
  }

  searchAgency($event: MouseEvent) {
    if (
      this.agencyFilter.name !== '' ||
      this.agencyFilter.number !== '' ||
      this.agencyFilter.state !== ''
    ) {
      this.filterAgencies = [
        ...this.agencies.filter((a) =>
          this.agencyFilter.name
            ? a.agencyName
                ?.toLowerCase()
                .includes(this.agencyFilter.name.toLowerCase().trim())
            : true && this.agencyFilter.number
            ? a.agencyNumber?.includes(this.agencyFilter.number.trim())
            : true && this.agencyFilter.state
            ? a.stateId === this.agencyFilter.state
            : true
        )
      ];
      this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
    } else {
      this.filterAgencies = [...this.agencies];
      this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
    }
  }

  goToFeaturesHandler($event: MouseEvent) {
    this.router.navigateByUrl('/dashboard');
  }

  nameChangeHandler($event: any) {
    this.agencyFilter.name = $event;
  }

  numberChangeHandler($event: any) {
    this.agencyFilter.number = $event;
  }

  stateChangeHandler($event: any) {
    this.agencyFilter.state = $event;
  }
}
