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

export class AgencyFilter {
  name: string;
  number: string;
  state: string;

  constructor(){
    this.name = '';
    this.number = '';
    this.state = '';
  }
}

@Component({
  selector: 'clgx-agency-landing',
  templateUrl: './agency-landing.component.html',
  styleUrls: ['./agency-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  agencyDataSource!: MatTableDataSource<Agency>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(
    public deviceService: DeviceDetectorService,
    private agencyFacade: AgencyStoreFacade,
    private cd: ChangeDetectorRef,
    public settingsFacadeService: SettingsStoreFacade,
    private router: Router
  ) {
    this.agencies$ = this.agencyFacade.agencies$;
    this.agencyFacade.getAgencies({ userId: '1', processId: '2' });
    this.agencyFilter = new AgencyFilter();
    
  }

  ngOnInit() {
    this.agencies$.subscribe((agencies) => {
      debugger;
      this.agencies = [...agencies];
      this.filterAgencies = [...agencies];
      this.agencyDataSource = new MatTableDataSource(agencies);
      this.cd ? this.cd.detectChanges() : '';
      console.log(this.agencies);
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

  openLink(link: string) {
    window.open(link, '_blank');
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

  searchAgency($event:MouseEvent){
    if(this.agencyFilter.name !== '' || this.agencyFilter.number !== '' || this.agencyFilter.state !== ''){
      this.filterAgencies = [...this.agencies.filter(a => a.agencyName?.includes(this.agencyFilter.name.trim()))];
      this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
    }else{
      this.filterAgencies = [...this.agencies];
      this.agencyDataSource = new MatTableDataSource(this.filterAgencies);
    }
  }

  goToFeaturesHandler($event:MouseEvent){
    this.router.navigateByUrl('/dashboard');
  }
}
