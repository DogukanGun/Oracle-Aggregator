export type ConfigCrfLayoutType = 'grid' | 'list';

/** Interface for the config state */
export interface IConfigState {
  /** If dark mode is enabled */
  dark: boolean;
  /** If sidebar should be collapsed */
  sidebarCollapsed: boolean;
  /** The preferred layout for CRF market */
  crfPreferredLayout: ConfigCrfLayoutType;
  /** If events button is clicked */
  events: boolean;
  /** If the CRF intro is done */
  crfIntroDone: boolean;
}

/** Config state used to manage user preferences */
export default class ConfigState implements IConfigState {
  dark: boolean;
  events: boolean;
  sidebarCollapsed: boolean;
  crfPreferredLayout: ConfigCrfLayoutType;
  crfIntroDone: boolean;

  constructor(obj?: Partial<IConfigState>) {
    this.dark = obj?.dark ?? true;
    this.events = obj?.events ?? false;
    this.sidebarCollapsed = obj?.sidebarCollapsed ?? false;
    this.crfPreferredLayout = obj?.crfPreferredLayout ?? 'grid';
    this.crfIntroDone = obj?.crfIntroDone ?? false;
  }
}
