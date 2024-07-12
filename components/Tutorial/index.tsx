import { useTheme } from '@/hooks/theme';
import React, { useState } from 'react';
import ReactJoyride, { Step } from 'react-joyride';

/** Type for tutorial component props */
type P = {
  /** Tutorial steps to show in tutorial */
  steps: Step[];
  onRunFinishedListener: () => void;
};

/** Displays a tutorial for given steps */
const Tutorial: React.FC<P> = ({ steps, onRunFinishedListener }) => {
  const { palette, borderRadius } = useTheme();
  const [run, setRun] = useState(true);
  const styles = {
    options: {
      arrowColor: palette.surface.dark,
      backgroundColor: palette.surface.dark,
      textColor: palette.typography.DEFAULT,
    },
    buttonNext: {
      backgroundColor: palette.primary.DEFAULT,
      color: palette.primary.contrast,
      borderRadius: borderRadius.xxl,
    },
    buttonBack: {
      color: palette.primary.DEFAULT,
    },
    beaconInner: {
      backgroundColor: palette.accent.DEFAULT,
    },
    beaconOuter: {
      borderColor: palette.accent.DEFAULT,
      backgroundColor: `${palette.accent.DEFAULT}33`,
    },
  };
  return (
    <ReactJoyride
      steps={steps}
      continuous
      run={run}
      showProgress
      showSkipButton
      styles={styles}
      callback={(data) => {
        if (data.status === 'finished' || data.status === 'skipped' || data.action === 'close') {
          setRun(false);
          onRunFinishedListener();
        }
      }}
    />
  );
};

export default Tutorial;
