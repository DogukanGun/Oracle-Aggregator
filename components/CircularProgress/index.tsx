import { useTheme } from '@/hooks/theme';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

type P = {
  /** Percentage value */
  value: number;
};

const CircularProgress: React.FC<P> = ({ value }) => {
  const { palette } = useTheme();
  return (
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      className="w-[90px] h-[200px] mt-10"
      strokeWidth={5}
      styles={buildStyles({
        trailColor: palette.surface.dark,
        textColor: palette.typography.DEFAULT,
        pathColor: palette.success.DEFAULT,
        textSize: '1rem',
      })}
    />
  );
};
export default CircularProgress;
