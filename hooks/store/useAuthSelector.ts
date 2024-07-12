import { useSelector } from 'react-redux';
import { AppStateType, AuthState } from '@/store/state';

const useAuthSelector = () => {
  const auth = useSelector<AppStateType, AuthState>((store) => store.auth);
  return auth;
};

export default useAuthSelector;
