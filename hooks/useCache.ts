import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { cacheActions } from '@/store/actions';
import { AppStateType, CacheState } from '@/store/state';
import ProjectService from '@/services/ProjectService';

type ParamsType = {
  /**Slug of the project to fetch data*/
  slug?: string;
  /**Page parameter of the URL for paged requests*/
  page?: number;
  /** Pair for Oracle data */
  pair?: string;
  /** Chain for Oracle data */
  chain?: string;
  /** Repository for security data */
  repository?: string;
};

/** Hook to facilitate project data cache usage
 * @param key The key used to access the data in cache
 * @param params Dynamic params to be used in endpoints
 */
const useCache = (key: keyof CacheState, params: ParamsType = {}) => {
  const state = useSelector<AppStateType, CacheState>((s) => s.cache);
  const dispatch = useStore().dispatch;

  useEffect(() => {
    const prop = state[key];
    const needsLoad =
      prop &&
      prop.data === undefined &&
      !prop.loading &&
      prop.error === undefined;
    if (needsLoad) {
      dispatch(cacheActions.loading({ key }));
      const method = keyCallMap[key];
      method()
        .then((res) => {
          dispatch(
            cacheActions.loaded({
              key,
              data: res.data,
              metadata: res.metadata,
            }),
          );
        })
        .catch((e) => {
          dispatch(cacheActions.failed({ key, error: e.message }));
        });
    }
  }, [key, params, state, dispatch]);

  return state;
};

export default useCache;

/** Helper method to format projects response for useCache hook */
const getProjects = async () => {
  const projects = await ProjectService.getProjects();
  return { data: projects };
};

/** Map specifying which call is used to fetch data for which cache key */
const keyCallMap: Record<keyof CacheState, () => Promise<any>> = {
  projects: getProjects,
};
