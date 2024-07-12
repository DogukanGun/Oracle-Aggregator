'use client';

import React from 'react';
import UserConfigService from '@/services/UserConfigService';
import LabeledSwitch from '../LabeledSwitch';
import { useTheme } from '@/hooks/theme';

export type ThemeSwitchPropsType = {
  /** Forces dark or light variant */
  variant?: 'dark' | 'light';
};

/** Renders a switch used to toggle the theme */
export default function ThemeSwitch({
  variant,
}: Readonly<ThemeSwitchPropsType>) {
  const { isDark } = useTheme();
  const handleChange = UserConfigService.toggleTheme;

  return (
    <LabeledSwitch
      checked={isDark}
      onChange={handleChange}
      left="Light"
      right="Dark"
      variant={variant}
    />
  );
}
