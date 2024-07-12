/** Base app route type */
export type RouteType = {
  /** ID of the route */
  id: string;
  /** Label of the route */
  label: string;
  /** Path of the route */
  path: string;
};

/** Sidebar route type */
export type NavRouteType = RouteType & {
  /** Children of the route. Collapsed by default, can be expanded. */
  children?: NavRouteType[];
  /** If the route should be anchored at the bottom of the sidebar. */
  isBottom?: boolean;
  /** Should be true if route need to be disabled */
  isDisabled?: boolean;
};
