import { FeedbackContext } from '@/context';
import React, { useContext } from 'react';
import { CardDialog } from '../Dialog';
import Typography from '../Typography';

/** Renders a Yes/No confirmation dialog. Used through FeedbackContext. */
export function ConfirmDialog() {
  const context = useContext(FeedbackContext);
  const state = context.state || { message: '' };

  const onClose = (isPositive?: boolean) => {
    state.onClose && state.onClose(isPositive);
    context.closeConfirmation();
  };

  return (
    <CardDialog
      isOpen={state.visible}
      onClose={() => onClose(false)}
      title={state.title || 'Confirmation'}
      buttons={[
        {
          text: 'Yes',
          onClick() {
            onClose(true);
          },
        },
        {
          text: 'No',
          onClick() {
            onClose(false);
          },
        },
      ]}
    >
      <Typography text={state.message} />
    </CardDialog>
  );
}
