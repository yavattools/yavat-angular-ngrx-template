import { createAction, props } from '@ngrx/store';

import { Language } from './settings.model';

export const actionSettingsChangeLanguage = createAction(
  '[Settings] Change Language',
  props<{ language: Language }>()
);

export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);
export const actionSettingsChangeAutoNightMode = createAction(
  '[Settings] Change Auto Night Mode',
  props<{ autoNightMode: boolean }>()
);

export const actionSettingsChangeStickyHeader = createAction(
  '[Settings] Change Sticky Header',
  props<{ stickyHeader: boolean }>()
);

export const actionSettingsShowHeaderTime = createAction(
  '[Settings] Show Header Time',
  props<{ headerShowTime: string }>()
);

export const actionSettingsShowHeader = createAction(
  '[Settings] Show Header',
  props<{ showHeader: boolean }>()
);

export const actionSettingsHideHeader = createAction(
  '[Settings] Hide Header',
  props<{ showHeader: boolean }>()
);

export const actionStartActionInProgress = createAction(
  '[Settings] Start Action in Progress'
);

export const actionStopActionInProgress = createAction(
  '[Settings] Stop Action in Progress'
);

export const actionSettingsChangeAnimationsPage = createAction(
  '[Settings] Change Animations Page',
  props<{ pageAnimations: boolean }>()
);

export const actionSettingsChangeAnimationsPageDisabled = createAction(
  '[Settings] Change Animations Page Disabled',
  props<{ pageAnimationsDisabled: boolean }>()
);

export const actionSettingsChangeAnimationsElements = createAction(
  '[Settings] Change Animations Elements',
  props<{ elementsAnimations: boolean }>()
);
export const actionSettingsChangeHour = createAction(
  '[Settings] Change Hours',
  props<{ hour: number }>()
);
