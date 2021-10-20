import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Feature, features } from '../dashboard-view.data';

@Component({
  selector: 'clgx-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardViewComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;

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
