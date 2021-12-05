import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import {
  actionSettingsChangeAnimationsElements,
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeHour,
  actionSettingsChangeLanguage,
  actionSettingsChangeStickyHeader,
  actionSettingsChangeTheme,
  actionSettingsHideHeader,
  actionSettingsShowHeader,
  actionSettingsShowHeaderTime,
  actionStartActionInProgress,
  actionStopActionInProgress
} from './settings.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'DEFAULT-THEME',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  stickyHeader: true,
  stickyShowHeader: true,
  headerShowTime: 'on-scroll',
  showHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  hour: 0,
  actionInProgress: false
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    actionSettingsChangeAutoNightMode,
    actionSettingsChangeStickyHeader,
    actionSettingsChangeAnimationsPage,
    actionSettingsChangeAnimationsElements,
    actionSettingsChangeHour,
    (state, action) => ({ ...state, ...action })
  ),
  on(
    actionSettingsChangeAnimationsPageDisabled,
    (state, { pageAnimationsDisabled }) => ({
      ...state,
      pageAnimationsDisabled,
      pageAnimations: false
    })
  ),
  on(actionSettingsShowHeaderTime, (state, action) => ({
    ...state,
    headerShowTime: action.headerShowTime
  })),
  on(actionSettingsShowHeader, (state, action) => ({
    ...state,
    stickyShowHeader: action.showHeader
  })),
  on(actionSettingsHideHeader, (state, action) => ({
    ...state,
    stickyShowHeader: action.showHeader
  })),
  on(actionStartActionInProgress, (state, action) => ({
    ...state,
    actionInProgress: true
  })),
  on(actionStopActionInProgress, (state, action) => ({
    ...state,
    actionInProgress: false
  }))
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
