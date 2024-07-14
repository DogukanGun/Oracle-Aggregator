import { NavRouteType } from '@/types/Route';
import {
  faFolders, faShoppingBag,
} from '@fortawesome/pro-regular-svg-icons';

/** Contains a list of pages for routing. Object structure based on the file structure of app/pages dir.
 * A route (except root) should use self to refer to its own data and its children should be keyed objects.
 */
export const appRoutes = {
  auth: {
    self: {
      path: '/auth',
      label: 'Authentication',
    },
    confirm: {
      self: {
        path: '/auth/confirm',
        label: 'Confirm',
      },
    },
    login: {
      self: {
        path: '/auth/login',
        label: 'Login',
      },
    },
    register: {
      self: { path: '/auth/register', label: 'Register' },
    },
    resetPassword: {
      self: {
        path: '/auth/forgot/password',
        label: 'Reset Password',
      },
      confirm: {
        path: '/auth/forgot/password',
        label: 'Confirm Reset',
      },
    },
  },
  
  root: {
    path: '/',
    label: 'Dashboard',
  },
  
} as const;

const navRoutes: NavRouteType[] = [
  {
    id: 'projects',
    icon: faFolders,
    isEnabled: true,
    label: 'Oracles',
    path: '/',
  },
  {
    id: 'projects',
    icon: faShoppingBag,
    isEnabled:true,
    label: 'Marketplace',
    path: '/marketplace'
  }
  
];

export { navRoutes };
