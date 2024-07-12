import React from 'react';
import Loader, { LoaderPropsType } from '../Loader';
import IconTextMessage, { IconTextMessagePropsType } from '../IconTextMessage';
import { faFrown } from '@fortawesome/pro-regular-svg-icons';
import Stack from '../Stack';

export type LoadingErrorPropsType = {
  /** The loading state */
  loading?: boolean;
  /** The error to show in message */
  error?: string;
  /** Props for the loader */
  loaderProps?: Partial<LoaderPropsType>;
  /** Props for the error message */
  messageProps?: Partial<IconTextMessagePropsType>;
};

/** Renders a loader if loading, and error message in case of an error */
export default function LoadingError({
  loading,
  error,
  loaderProps,
  messageProps,
}: Readonly<LoadingErrorPropsType>) {
  if (!loading && !error) return <></>;

  return loading ? (
    <Stack className="items-center justify-center">
      <Loader {...loaderProps} />
    </Stack>
  ) : (
    <IconTextMessage
      title="Oops"
      description={error ?? 'Failed to load data.'}
      icon={faFrown}
      {...messageProps}
    />
  );
}
