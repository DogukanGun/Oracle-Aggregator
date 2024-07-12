import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ConfigReducer from './config.reducer';
import SidebarReducer from './sidebar.reducer';
import SearchbarReducer from './searchbar.reducer';

const Reducer = combineReducers({
  auth: AuthReducer,
  config: ConfigReducer,
  sidebar: SidebarReducer,
  searchbar: SearchbarReducer,
});

export default Reducer;
