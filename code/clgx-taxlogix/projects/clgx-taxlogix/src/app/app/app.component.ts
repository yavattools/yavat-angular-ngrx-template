import browser from 'browser-detect';
import {
  AfterViewInit,
  Component,
  HostListener,
  NgZone,
  OnInit
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store, select } from '@ngrx/store';
import { fromEvent, Observable, of } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsShowHeader,
  selectSettingsLanguage,
  selectEffectiveTheme,
  AppState,
  ROUTE_ANIMATIONS_ELEMENTS
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/store/settings/settings.actions';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
  withLatestFrom
} from 'rxjs/operators';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';

export enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'clgx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
 // For Progressbar
 public loaders = this.loadingService.value$.pipe(
  delay(1000),
  withLatestFrom(this.loadingService.value$),
  map(v => {
    debugger
    v[1]
    }),
);

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = 'assets/images/logo.png';
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he', 'ar'];

  navigationSideMenu = [{ link: 'settings', label: 'clgx.menu.settings' }];

  scrollPosition = 0;
  showNavbar = false;
  isAuthenticated$: Observable<boolean> | undefined;
  stickyHeader$: Observable<boolean> | undefined;
  headerShowTime$: Observable<string> | undefined;
  showHeader$: Observable<boolean> | undefined;
  language$: Observable<string> | undefined;
  theme$: Observable<string> | undefined;
  actionInProgress$: Observable<boolean> | undefined;
  headerShowTime: string = '';
  showHeader: boolean = false;
  actionInProgress: boolean = false;
  displayProgressSpinner: boolean = true;
  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    public agencyFacadeService: AgencyStoreFacade,
    public settingsFacadeService: SettingsStoreFacade,
    private scrollDispatcher: ScrollDispatcher,
    public loadingService: LoadingBarService, 
    private router: Router,
    private zone: NgZone
  ) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.showHeader$ = this.store.pipe(select(selectSettingsShowHeader));

    this.settingsFacadeService.headerShowTime$.subscribe((showTime) => {
      this.headerShowTime = showTime;
    });
    this.actionInProgress$?.subscribe(p => {
      this.displayProgressSpinner = p;
    })
    this.loadingService.value$.
    subscribe(r => {
      if(r != 0){
        this.displayProgressSpinner = true;
        // alert('progress' + this.displayProgressSpinner);
      }else{
        setTimeout(() => {
          this.displayProgressSpinner = false;
        // alert('progress stopped' + this.displayProgressSpinner);

        }, 1000);
      }
    })
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name || '');
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.agencyFacadeService.actionInProgress$.subscribe(p => {
      this.actionInProgress = p;
    })
  }

  ngAfterViewInit() {
    this.scrollDispatcher.scrolled().subscribe((cdk: any) => {
      this.zone.run(() => {
        //Here you can add what to happen when scroll changed
        //I want to display the scroll position for example
        const scrollPosition = cdk.getElementRef().nativeElement.scrollTop;
        // console.log('scrolling position: ' + scrollPosition);
        this.scrollPosition = scrollPosition;
        if (scrollPosition > 50) {
          if (this.headerShowTime == 'on-scroll') {
            this.settingsFacadeService.showHeader();
          }
        } else {
          if (this.headerShowTime == 'on-scroll') {
            this.settingsFacadeService.hideHeader();
          }
        }
      });
    });
  }
}
