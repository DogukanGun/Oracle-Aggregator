import { AppStateType } from '@/store/state';
import SearchbarState from '@/store/state/searchbar.state';
import { useSelector } from 'react-redux';

const useSearchBarSelector = () => {
  const searchbar = useSelector<AppStateType, SearchbarState>(
    (store) => store.searchbar
  );
  return searchbar;
};

export default useSearchBarSelector;
