import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import Loader from '../Loader';
import Typography from '../Typography';
import Syncing from '@/app/syncing';

type P = {
  loading: boolean;
  error: AxiosError<unknown, any> | Error | undefined;
};
const ErrorLoading: React.FC<P> = ({ loading, error }) => {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  if (loading) {
    return <Loader />;
  } else if (error) {
    return <Typography text={error?.message} variant="subtitle2" />;
  } else {
    return <Syncing />;
  }
};

export default ErrorLoading;
