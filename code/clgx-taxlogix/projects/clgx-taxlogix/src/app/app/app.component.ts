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
  authLogin,
  authLogout,
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
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';

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
  headerShowTime: string = '';
  showHeader: boolean = false;
  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    public settingsFacadeService: SettingsStoreFacade,
    private scrollDispatcher: ScrollDispatcher,
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
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  ngAfterViewInit() {
    this.scrollDispatcher.scrolled().subscribe((cdk: any) => {
      this.zone.run(() => {
        //Here you can add what to happen when scroll changed
        //I want to display the scroll position for example
        const scrollPosition = cdk.getElementRef().nativeElement.scrollTop;
        console.log('scrolling position: ' + scrollPosition);
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
