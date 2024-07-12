import React, { useMemo } from 'react';
import Typography from '../Typography';

export type ButtonVariantType = 'outlined' | 'contained';

export type ButtonPropsType = {
  /** Text to show on the button */
  text: string;
  /** If the button should be large */
  isLarge?: boolean;
  /** Icon to show */
  icon?: React.ReactElement;
  /** If the icon should be rendered at right */
  iconRight?: boolean;
  /** If the button should be disabled */
  disabled?: boolean;
  /** If tailwind css want to be added */
  className?: string;
  /** Called when button is clicked */
  onClick?: () => void;
  /** Variant of the button */
  variant?: ButtonVariantType;
  /** If the button is in loading state. Also applies disabled state. */
  loading?: boolean;
};

export default function AlterscopeButton({
  text,
  isLarge,
  icon,
  iconRight,
  className = '',
  disabled = false,
  onClick,
  variant,
  loading = false,
}: Readonly<ButtonPropsType>) {
  const [btnClass] = useMemo(() => {
    const btnClass = [
      'rounded-full min-w-[140px] flex flex-row items-center justify-center',
    ];
    if (isLarge) {
      btnClass.push('px-6 py-3 space-x-2');
    } else {
      btnClass.push('px-3 py-1.5 space-x-1');
    }
    if (disabled) {
      btnClass.push(
        'cursor-not-allowed text-surface-muted dark:text-surfaceDark-muted',
      );
      if (variant === 'contained') {
        btnClass.push('bg-surface-dark dark:bg-surfaceDark-dark');
      } else {
        btnClass.push(
          'border border-surface-muted dark:border-surfaceDark-muted',
        );
      }
    } else {
      btnClass.push('cursor-pointer');
      if (variant === 'contained') {
        btnClass.push(
          'bg-primary text-surface hover:text-surface-muted dark:bg-primaryDark dark:text-surfaceDark dark:hover:text-surfaceDark-muted ',
        );
      } else {
        btnClass.push(
          'border border-primary text-primary hover:text-surface hover:bg-primary dark:border-primaryDark dark:hover:bg-primaryDark dark:text-primaryDark hover:dark:text-surfaceDark',
        );
      }
    }
    btnClass.push(className);
    return [btnClass.join(' ')];
  }, [className, disabled, isLarge, variant]);

  return (
    <button
      className={btnClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && !iconRight && <span>{icon}</span>}
      <Typography disableDefaultColor text={text} />
      {icon && iconRight && <span>{icon}</span>}
    </button>
  );
}
