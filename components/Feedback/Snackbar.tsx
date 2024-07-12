import { CustomContentProps, SnackbarContent, closeSnackbar } from 'notistack';
import React, { forwardRef } from 'react';
import { FeedbackMessageType } from '@/types/Components/Feedback';
import Alert from '../Alert';

/** Custom options for snackbar configuration */
export type SnackbarCustomContentExtensionType = {
  /** Brief description of the message */
  description?: string;
};

/** SnackbarContent options */
export type SnackbarContentOptionsType = CustomContentProps &
  SnackbarCustomContentExtensionType;

/** Generates ForwardRef snack components */
const genFwdSnack = (type?: FeedbackMessageType) =>
  forwardRef<HTMLDivElement, SnackbarContentOptionsType>(
    function SnackComponent(p, r) {
      if (typeof p.message !== 'string') {
        throw Error('Snackbar only supports string messages.');
      }

      return (
        <SnackbarContent ref={r}>
          <Alert
            variant={type}
            title={p.message}
            description={p.description}
            onClose={() => closeSnackbar(p.id)}
          />
        </SnackbarContent>
      );
    },
  );

/** Snackbar shown by default */
const DefaultSnackbar = genFwdSnack();
/** Snackbar shown in case of action success */
const SuccessSnackbar = genFwdSnack('success');
/** Snackbar shown for warning the user*/
const WarningSnackbar = genFwdSnack('warning');
/** Snackbar shown in case of action failure or error */
const ErrorSnackbar = genFwdSnack('error');
/** Snackbar shown as info */
const InfoSnackbar = genFwdSnack('info');
/** Snackbar shown while loading */
const LoadingSnackbar = genFwdSnack('loading');

/** Snackbar components for notistack */
export const notistackComponents = {
  default: DefaultSnackbar,
  success: SuccessSnackbar,
  warning: WarningSnackbar,
  error: ErrorSnackbar,
  info: InfoSnackbar,
  loading: LoadingSnackbar,
};
