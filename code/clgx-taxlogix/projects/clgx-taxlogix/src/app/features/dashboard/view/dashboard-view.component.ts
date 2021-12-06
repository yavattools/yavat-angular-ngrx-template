import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';
import { AccountProfile } from '@app/core/store/auth/auth.models';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { AgencyFeature, features } from '../dashboard-view.data';

@Component({
  selector: 'clgx-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: AgencyFeature[] = features;
  account!: AccountProfile;
  isMobile: boolean = false;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
    public deviceService: DeviceDetectorService,
    public settingsFacadeService: SettingsStoreFacade,
    public authStoreFacade: AuthStoreFacade,
    public agencyStoreFacadeService: AgencyStoreFacade,
    private router: Router
  ) {
    this.account = new AccountProfile();
    this.subscriptions.push(this.authStoreFacade.account$.subscribe(a => {
      this.account = a;
    }));
  }

  ngOnInit() {
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
  ngOnDestroy(){
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    })  
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }

  featureClickHandler($event: MouseEvent, feature: any) {
    $event.stopPropagation();
    if(feature.enabled){
      this.router.navigateByUrl('/agency');
    }
  }
}
