import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';

/** Base app route type */
export type RouteType = {
  /** ID of the route */
  id: string;
  /** Label of the route */
  label: string;
  /** Path of the route */
  path?: string;
};

/** Sidebar route type */
export type NavRouteType = RouteType & {
  /** Icon to show when route is active */
  activeIcon?: IconDefinition;
  /** Default icon */
  icon?: IconDefinition;
  /** Children of the route. Collapsed by default, can be expanded. */
  children?: NavRouteType[];
  /** If the route should be anchored at the bottom of the sidebar. */
  isBottom?: boolean;
  /** If the route should be enabled only for admin and manager */
  isOnlyForManager?: boolean;
  /** If the route should be enabled in the sidebar. */
  isEnabled?: boolean;
  /** Tag shown along with the nav link indicating status as a badge */
  tag?: 'beta';
};
