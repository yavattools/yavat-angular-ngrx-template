
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromActions from './settings.actions';
import * as fromSelectors from './settings.selectors';
import { AppState } from '@app/core/core.state';

@Injectable({ providedIn: 'root' })
export class SettingsStoreFacade {
  showHeader$ = this.store.pipe(select(fromSelectors.selectSettingsShowHeader));
  headerShowTime$ = this.store.pipe(select(fromSelectors.selectSettingsHeaderShowTime));
  actionInProgress$ = this.store.pipe(select(fromSelectors.selectActionInProgress));

  constructor(private store: Store<AppState>) {}

  showHeader(){
    this.store.dispatch(fromActions.actionSettingsShowHeader({showHeader: true}))
  }

  setHeaderShowTime(showTime: string){
    this.store.dispatch(fromActions.actionSettingsShowHeaderTime({headerShowTime: showTime}))
  }

  hideHeader(){
    this.store.dispatch(fromActions.actionSettingsHideHeader({showHeader: false}))
  }

  startActionInProgress(){
    this.store.dispatch(fromActions.actionStartActionInProgress())
  }

  stopActionInProgress(){
    this.store.dispatch(fromActions.actionStopActionInProgress())
  }

}
