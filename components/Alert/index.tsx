import React, { HTMLProps, useMemo } from 'react';
import Typography from '../Typography';
import { useTheme } from '@/hooks/theme';
import Icon from '../Icon';
import {
  faCheckCircle,
  faClose,
  faEnvelope,
  faExclamationCircle,
  faInfoCircle,
  faTriangleExclamation,
} from '@fortawesome/pro-regular-svg-icons';
import Loader from '../Loader';
import { FeedbackMessageType } from '@/types/Components/Feedback';

/** Props type for alert component */
export type AlertPropsType = HTMLProps<HTMLDivElement> & {
  /** Title of the alert */
  title: string;
  /** Description of the alert */
  description?: string;
  /** Variant of the alert. Controls color and icon. */
  variant?: FeedbackMessageType;
  /** Called when alert is closed. Shows close button. */
  onClose?: () => void;
};

/** Renders an alert component */
export default function Alert({
  title,
  description,
  variant,
  onClose,
  ...props
}: AlertPropsType) {
  const { palette } = useTheme();
  const [classes, color, icon] = useMemo(() => {
    const baseClasses =
      'rounded-sm shadow-snackbar px-3 py-2 flex justify-between gap-4 w-full md:w-[388px]';
    let classes = 'bg-info-muted dark:bg-infoDark-muted text-info';
    let color = palette.info;
    let icon = faEnvelope;
    if (variant === 'error') {
      classes = 'bg-error-muted dark:bg-errorDark-muted text-error';
      color = palette.error;
      color.contrast = palette.typography.DEFAULT;
      icon = faExclamationCircle;
    } else if (variant === 'info') {
      classes = 'bg-purple-muted dark:bg-purpleDark-muted text-purple';
      color = palette.info;
      icon = faInfoCircle;
    } else if (variant === 'success') {
      classes = 'bg-success-muted dark:bg-successDark-muted text-success';
      color = palette.success;
      icon = faCheckCircle;
    } else if (variant === 'warning') {
      classes = 'bg-warning-muted dark:bg-warningDark-muted text-warning';
      color = palette.warning;
      icon = faTriangleExclamation;
    } else if (variant === 'loading') {
      classes =
        'items-center bg-primary dark:bg-primaryDark text-primary-contrast dark:text-primaryDark-contrast';
      color = palette.primary;
    }
    return [[baseClasses, classes].join(' '), color, icon];
  }, [variant, palette]);

  const isLoading = variant === 'loading';

  return (
    <div {...props} className={classes} role="alert">
      <div className="flex gap-2">
        {!isLoading && <Icon icon={icon} size="md" color={color.DEFAULT} />}
        <div className="flex flex-col gap-0.5">
          <Typography
            text={title}
            weight="medium"
            disableDefaultColor
            variant="subtitle2"
          />
          {description && <Typography variant="link3" text={description} />}
        </div>
      </div>
      {!isLoading ? (
        onClose && (
          <Icon
            icon={faClose}
            size="sm"
            onClick={onClose}
            color={color.DEFAULT}
          />
        )
      ) : (
        <Loader color={palette.accent.DEFAULT} size="xxl" />
      )}
    </div>
  );
}
