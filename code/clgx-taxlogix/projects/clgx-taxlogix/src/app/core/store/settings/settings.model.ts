import { AppState } from '../../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export type Language = 'en' | 'sk' | 'de' | 'fr' | 'es' | 'pt-br' | 'he' | 'ar';

export interface SettingsState {
  language: string;
  theme: string;
  autoNightMode: boolean;
  nightTheme: string;
  stickyHeader: boolean;
  stickyShowHeader: boolean;
  showHeader: boolean;
  headerShowTime: string;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
  hour: number;
  actionInProgress: boolean;
}

export interface State extends AppState {
  settings: SettingsState;
}
