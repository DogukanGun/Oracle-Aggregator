import AuthState from './auth.state';
import ConfigState from './config.state';
import SearchbarState from './searchbar.state';
import SidebarState from './sidebar.state';

export type AppStateType = {
  auth: AuthState;
  config: ConfigState;
  sidebar: SidebarState;
  searchbar: SearchbarState;
};

export {
  AuthState,
  ConfigState,
  SidebarState,
  SearchbarState
};
