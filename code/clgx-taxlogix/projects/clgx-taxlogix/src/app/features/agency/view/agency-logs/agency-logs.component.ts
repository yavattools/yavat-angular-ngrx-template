import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { AgencyFeature, agencies } from '../../agency-view.data';

@Component({
  selector: 'clgx-agency-logs',
  templateUrl: './agency-logs.component.html',
  styleUrls: ['./agency-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyLogsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;

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
