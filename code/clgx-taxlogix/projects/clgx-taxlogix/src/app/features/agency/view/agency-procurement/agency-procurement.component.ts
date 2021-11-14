import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { Agency, agencies } from '../../agency-view.data';

@Component({
  selector: 'clgx-agency-procument',
  templateUrl: './agency-procurement.component.html',
  styleUrls: ['./agency-procurement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyProcumentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: Agency[] = agencies;

  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService){

  }

  ngOnInit() {
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
