import React from 'react';
import Stack from '../Stack';
import Typography, { TypographyPropsType } from '../Typography';

export type ProgressBarPropsType = {
  /** The progress value */
  value: number;
  /** Min value for progress bar */
  min?: number;
  /** Max value for progress bar */
  max?: number;
  /** Custom label */
  label?: string;
  /** Custom props for label */
  labelProps?: Omit<TypographyPropsType, 'text'>;
  /** Custom height for progress bar */
  height?: number;
  /** Color for progress bar backdrop */
  bgColor?: string;
  /** Color for progress bar */
  color?: string;
};

export default function ProgressBar({
  value = 0,
  min = 0,
  max = 100,
  label,
  labelProps,
  height,
  bgColor,
  color,
}: Readonly<ProgressBarPropsType>) {
  if (value < min) value = min;
  if (value > max) value = max;
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <Stack spacing={1}>
      {label && <Typography {...labelProps} text={label} />}
      <Stack isRow>
        <div
          className="w-full h-1 bg-primaryDark-muted dark:bg-primary-muted rounded-xxl"
          style={{ height, backgroundColor: bgColor }}
        >
          <div
            className="h-full bg-primary dark:bg-primaryDark rounded-xxl"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
      </Stack>
    </Stack>
  );
}
