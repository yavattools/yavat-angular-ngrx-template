import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { Agency } from '@app/core/store/agency/agency.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'clgx-agency-view',
  templateUrl: './agency-landing.component.html',
  styleUrls: ['./agency-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyLandingComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies$ : Observable<Agency[]>;
  agencies: Agency[] = [];
  clickedRows = new Set<Agency>();
  displayedColumns: string[] = [
    'number',
    'name',
    'address',
    'city',
    'state',
    'phoneNumber'
  ];

  isMobile: Boolean = false;

  constructor(public deviceService: DeviceDetectorService , private agencyFacade : AgencyStoreFacade , private router : Router) {
    this.agencies$ = this.agencyFacade.agencies$;
    this.agencyFacade.getAgencies({userId : '1' , processId : '2'});
  }

  ngOnInit() {
    this.agencies$.subscribe(agencies => {
      this.agencies = agencies;
      console.log(this.agencies)
    })
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  navigateToDetails(agency : Agency){
    this.agencyFacade.setSelectedAgency(agency)
    this.router.navigateByUrl('/agency/agency-details');
  }
}
