import store from '@/store';
import { configActions } from '@/store/actions';
import { ConfigCrfLayoutType, IConfigState } from '@/store/state/config.state';
import StorageService from './StorageService';

const KEY_BASE = 'CONFIG';
const KEY_DARK_MODE = [KEY_BASE, 'DARK_MODE'].join('_');
const KEY_EVENTS_MODE = [KEY_BASE, 'EVENTS_MODE'].join('_');
const KEY_SIDEBAR_COLLAPSED = [KEY_BASE, 'SIDEBAR_COLLAPSED'].join('_');
const KEY_CRF_LAYOUT = [KEY_BASE, 'CRF_LAYOUT'].join('_');
const KEY_CRF_INTRO_DONE = [KEY_BASE, 'CRF_INTRO_DONE'].join('_');

/** Map of config state keys to config storage keys */
const keyMap: Record<keyof IConfigState, string> = {
  dark: KEY_DARK_MODE,
  events:KEY_EVENTS_MODE,
  sidebarCollapsed: KEY_SIDEBAR_COLLAPSED,
  crfPreferredLayout: KEY_CRF_LAYOUT,
  crfIntroDone: KEY_CRF_INTRO_DONE,
};

/** Service that manages user config */
class UserConfigService extends StorageService {
  constructor() {
    super();
    const dark = this.getData(KEY_DARK_MODE) === 'true';
    const sidebarCollapsed = this.getData(KEY_SIDEBAR_COLLAPSED) === 'true';
    const layoutType =
      this.getData(KEY_CRF_LAYOUT) === 'list' ? 'list' : 'grid';
    const crfIntroDone = this.getData(KEY_CRF_INTRO_DONE) === 'true';
    store.dispatch(
      configActions.set({
        dark,
        sidebarCollapsed,
        crfPreferredLayout: layoutType,
        crfIntroDone,
      }),
    );
  }

  /** Sets state of a dark mode to false */
  turnDarkModeOf() {
    store.dispatch(configActions.set({ dark: false }));
    this.saveData(KEY_DARK_MODE, false.toString());
  }

  /** Sets state of dark mode to given value
   * @param key The key to set state of
   * @param value The value to set the key to
   */
  private set(key: keyof IConfigState, value: number | string | boolean) {
    store.dispatch(configActions.set({ [key]: value }));
    const storageKey = keyMap[key];
    this.saveData(storageKey, value.toString());
  }

  /** Toggles state of given key
   * @param key The key of data to toggle state of
   */
  private toggle(key: keyof Omit<IConfigState, 'crfPreferredLayout'>) {
    const state = store.getState().config[key];
    this.set(key, !state);
    return !state;
  }

  /** Toggles dark mode on or off */
  toggleTheme = () => this.toggle('dark');

  /** Toggles sidebar collapse state */
  toggleSidebar = () => this.toggle('sidebarCollapsed');

  /** Toggles events popup collapse state */
  toogleEvents = () => this.toggle('events');

  /** Sets layout type for CRF marketplace */
  setLayoutType = (t: ConfigCrfLayoutType) => this.set('crfPreferredLayout', t);

  /** Sets CRF onboarding done */
  setCRFOnboardingDone = () => this.set('crfIntroDone', true);
}

export default new UserConfigService();
