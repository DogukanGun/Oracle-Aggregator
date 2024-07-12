import { FeedbackContextType } from '@/context/FeedbackContext';

type P<T, ET> = {
  /** The context to use for snackbars */
  context: FeedbackContextType;
  /** The promise to await */
  promise: Promise<T>;
  /** Called on successful resolution of promise
   * @param data The resolved data
   */
  onSuccess?: (data: T) => void;
  /** Called when promise is rejected
   * @param error The error for rejection
   */
  onError?: (error: ET) => void;
  /** Called after promise has resolved or rejected */
  onFinish?: () => void;
  /** Message to show on success */
  successMessage?: string;
  /** Message to show on error */
  failMessage?: string;
  /** Message to show while loading */
  loadingMessage?: string;
};

/** Generic method to resolve an async promise with step by step feedback through snackbar */
export const asyncWithFeedback = async <T, ET = Error>({
  context,
  promise,
  onSuccess,
  onError,
  onFinish,
  successMessage,
  failMessage,
  loadingMessage,
}: P<T, ET>) => {
  const { createSnackbar, closeSnackbar } = context;
  const snack = createSnackbar(loadingMessage ?? 'Working...', {
    persist: true,
    variant: 'loading',
  });
  promise
    .then((data) => {
      createSnackbar(successMessage ?? 'Success!', { variant: 'success' });
      onSuccess?.(data);
    })
    .catch((e) => {
      createSnackbar(failMessage ?? 'Failed!', { variant: 'error' });
      onError?.(e as ET);
    })
    .finally(() => {
      closeSnackbar(snack);
      onFinish?.();
    });
  return promise;
};
