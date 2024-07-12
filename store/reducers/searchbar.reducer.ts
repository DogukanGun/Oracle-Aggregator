import { ActionType } from '../actions/action.type';
import { SearchbarActionType } from '../actions/searchbar.actions';
import { ISearchbarState } from '../state/searchbar.state';
/** Initial auth state */
const initialState = {} as ISearchbarState;

/**
 * Sidebar reducer function
 * @param state - Current auth state
 * @param action - Dispatched action
 * @returns Updated auth state
 */
export default function SearchbarReducer(
  state = initialState,
  action: SearchbarActionType | ActionType<'', undefined>,
) {
  switch (action.type) {
    case 'search':
      return { text: action.payload?.text };
    default:
      return state;
  }
}
