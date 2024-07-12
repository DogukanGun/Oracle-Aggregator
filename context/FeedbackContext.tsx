import {
  ConfirmDialog,
  SnackbarCustomContentExtensionType,
  notistackComponents,
} from '@/components/Feedback';
import {
  OptionsWithExtraProps,
  SnackbarKey,
  SnackbarProvider,
  VariantType,
  useSnackbar,
} from 'notistack';
import React, { useState } from 'react';
import {
  FeedbackInputType,
  FeedbackStateType,
} from '@/types/Components/Feedback';

/** Type for `createSnackbar` method form FeedbackContext */
export type CreateSnackbarType = <V extends VariantType>(
  /** The message title */
  message: string,
  /** More options for snackbar configuration */
  options?: OptionsWithExtraProps<V> & SnackbarCustomContentExtensionType,
) => SnackbarKey;

/** Type for FeedbackContext */
export type FeedbackContextType = {
  /** Current state of the feedback */
  state?: FeedbackStateType;
  /** Shows the confirmation dialog */
  createConfirmation: (input: FeedbackInputType) => void;
  /** Closes the confirmation dialog */
  closeConfirmation: () => void;
  /** Creates a new snackbar */
  createSnackbar: CreateSnackbarType;
  /** Closes the snackbar with given key
   * @param key Key of the snackbar to close
   */
  closeSnackbar: (key?: SnackbarKey | undefined) => void;
};

/** The feedback context object providing methods for
 * feedback creation
 */
export const FeedbackContext = React.createContext<FeedbackContextType>(
  {} as any,
);

/** Inner provider for FeedbackContext options */
function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<FeedbackStateType>({ message: '' });
  const { enqueueSnackbar: createSnackbar, closeSnackbar } = useSnackbar();

  const createConfirmation = (input: FeedbackInputType) => {
    setState({ ...input, visible: true });
  };

  const closeConfirmation = () => {
    setState({ ...state, visible: false });
  };

  return (
    <FeedbackContext.Provider
      value={{
        state,
        createConfirmation,
        closeConfirmation,
        createSnackbar,
        closeSnackbar,
      }}
    >
      {children}
      <ConfirmDialog />
    </FeedbackContext.Provider>
  );
}

/** Wraps SnackbarProvider around inner provider */
function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SnackbarProvider Components={notistackComponents}>
      <Provider>{children}</Provider>
    </SnackbarProvider>
  );
}

/** Provides options to control user feedback through FeedbackContext */
export const FeedbackProvider = Wrapper;
