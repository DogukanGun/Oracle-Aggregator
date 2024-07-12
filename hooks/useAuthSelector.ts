import { AppStateType, AuthState } from '@/store/state';
import { useSelector } from 'react-redux';

const useAuthSelector = () => {
  const auth = useSelector<AppStateType, AuthState>((store) => store.auth);
  return auth;
};

export default useAuthSelector;
