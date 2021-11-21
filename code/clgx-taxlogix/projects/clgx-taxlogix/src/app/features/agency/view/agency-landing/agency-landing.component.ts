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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

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
}
