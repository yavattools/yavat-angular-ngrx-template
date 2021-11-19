import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { AgencyFeature, features } from '../dashboard-view.data';

@Component({
  selector: 'clgx-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardViewComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: AgencyFeature[] = features;

  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService, private router: Router){

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

  featureClickHandler($event: MouseEvent){
    $event.stopPropagation();

    this.router.navigateByUrl('/agency');
  }
}
