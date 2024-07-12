/** Interface for sidebar state */
export interface ISearchbarState {
  text?: string;
}

/** Authorization state of the user */
export default class SearchbarState implements ISearchbarState {
  text?: string;

  constructor(obj?: Partial<SearchbarState>) {
    if (obj) {
      this.text = obj.text;
    }
  }

  /** Initializes an Auth state from server JSON response. */
  static fromJson(data: any) {
    const sidebar = new SearchbarState(data);
    return sidebar;
  }
}
