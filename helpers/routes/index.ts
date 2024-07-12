type RouteType = { path: string; label: string };

function isValidParam(paramName: string, paramValue?: string | string[]) {
  if (paramValue === undefined) {
    throw new Error(`Parameter "${paramName}" is required but not provided.`);
  }
  return true;
}

function handleParam(
  isMult: boolean,
  param: string,
  paramValue: string | string[],
  inPath: string,
) {
  let path = '';
  if (isMult) {
    const paramPlaceholder = `[...${param}]`;
    if (!Array.isArray(paramValue)) {
      throw new Error(`Parameter "${param}" must be an array.`);
    }
    if (!isValidParam(param, paramValue) || paramValue.length === 0) {
      throw new Error(`Parameter "${param}" is invalid.`);
    }
    // Replace all occurrences of the parameter placeholder
    path = inPath.split(paramPlaceholder).join(paramValue.join('/'));
  } else if (!Array.isArray(paramValue)) {
    const paramPlaceholder = `[${param}]`;
    // Replace the parameter placeholder with its value
    path = inPath.replace(paramPlaceholder, paramValue);
  } else {
    throw new Error(`Parameter "${param}" is invalid.`);
  }
  return path;
}

/**
 * Generates a dynamic route based on a route object and parameters.
 * @param route The route object containing the route path with parameter placeholders.
 * @param parameters An object containing parameter names and their values.
 * @returns The generated route with parameter values replaced.
 *
 * @example
 * const projectsDetailRoute = {
 *   path: '/projects/[id]',
 *   label: 'Project Detail',
 * };
 *
 * const uniswapRoute = generateRoute(projectsDetailRoute, { id: 'uniswap' });
 * // Output: '/projects/uniswap'
 */
export function createRoute(
  route: RouteType,
  parameters: Record<string, string | string[]> = {},
): RouteType {
  let path = route.path;
  if (parameters) {
    for (const param in parameters) {
      if (Object.prototype.hasOwnProperty.call(parameters, param)) {
        const paramValue = parameters[param];
        const isMult = path.includes(`[...${param}]`);

        if (!isMult) {
          if (!isValidParam(param, paramValue)) {
            throw new Error(`Parameter "${param}" is invalid.`);
          }
        }

        path = handleParam(isMult, param, paramValue, path);
      }
    }
  }

  return { path, label: route.label };
}
