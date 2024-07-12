import React from 'react';
import {
  faCaretUp,
  faCaretDown,
  faLessThan,
  faGreaterThan,
} from '@fortawesome/pro-regular-svg-icons';
import Typography from '../Typography';
import { useTheme } from '@/hooks/theme';
import Icon from '../Icon';
import { shrinkNumber } from '@/helpers';

type P = {
  /** Contain left side value if we have any value on left */
  value?: number | string;
  /** Contain the change value */
  change: number;
  /** If change is in percent then true */
  isPercent?: boolean;
  /** If change is in number then true */
  isMathCompare?: boolean;
};

/** Renders the Change status with given values */
export const Change = ({ value, change, isPercent, isMathCompare }: P) => {
  const { palette } = useTheme();
  const lessIcon = isMathCompare ? faLessThan : faCaretDown;
  const upIcon = isMathCompare ? faGreaterThan : faCaretUp;
  const icon = change < 0 ? lessIcon : upIcon;
  const textColor =
    change < 0 ? palette.error?.DEFAULT : palette?.success?.DEFAULT;
  return (
    <div className="flex items-center ">
      {value && <Typography text={value} weight="regular" variant="caption1" />}
      <div className="space-x-0.5 flex items-center">
        <Icon icon={icon} size="sm" color={textColor} className="ml-1.5" />
        <Typography
          text={`${!isPercent ? '$' : ''} ${shrinkNumber(Math.abs(change))} ${isPercent ? '%' : ''
            }`}
          weight="regular"
          variant="caption1"
          color={textColor}
        />
      </div>
    </div>
  );
};
