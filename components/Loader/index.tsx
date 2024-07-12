import { useConfigSelector } from '@/hooks/store';
import { AppThemeSizeVariantsType } from '@/theme';
import { faSpinnerThird as spinner } from '@fortawesome/pro-regular-svg-icons';
import React from 'react';
import Icon from '../Icon';

/** Props for Loader component */
export type LoaderPropsType = {
  /** Size of the loader */
  size?: AppThemeSizeVariantsType;
  /** Invert loader color */
  inverted?: boolean;
  /** Custom color for loader */
  color?: string;
};

/** Renders an animated spinner */
export default function Loader({
  size,
  inverted,
  color,
}: Readonly<LoaderPropsType>) {
  const { dark } = useConfigSelector();
  const [className, classDark] = ['text-typography', 'text-typographyDark'];
  const colorClass = dark && !inverted ? classDark : className;
  return (
    <Icon
      icon={spinner}
      size={size ?? 'md'}
      className={'animate-spin ' + (color ? '' : colorClass)}
      color={color}
    />
  );
}
