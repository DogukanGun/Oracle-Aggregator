import { snakeToCamelKeys } from '@/helpers/utils/caseTransformers';
import { AxiosResponse } from 'axios';

/** Axios interceptor that converts snake case keys
 * from API response to camel case
 */
export const snakeToCamelInterceptor = (response: AxiosResponse) => {
  response.data = snakeToCamelKeys(response.data);
  return response;
};
