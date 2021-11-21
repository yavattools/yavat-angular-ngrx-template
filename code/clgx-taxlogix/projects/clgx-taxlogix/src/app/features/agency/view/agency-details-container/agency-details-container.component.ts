import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Agency } from '@app/core/store/agency/agency.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { AgencyFeature, agencies } from '../../agency-view.data';

@Component({
  selector: 'clgx-agency-details-container',
  templateUrl: './agency-details-container.component.html',
  styleUrls: ['./agency-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyDetailsContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;
  agency$: Observable<Agency>;

  isMobile: Boolean = false;
  constructor(
    public deviceService: DeviceDetectorService,
    private agencyFacade: AgencyStoreFacade,
    private router: Router
  ) {
    this.agency$ = this.agencyFacade.selectedAgency$;
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  back() {
    this.router.navigateByUrl('/agency');
  }
}
