import { useConfigSelector } from '@/hooks/store';
import React, { HTMLProps, useCallback, useEffect, useRef } from 'react';

type SliderProps = HTMLProps<HTMLInputElement> & {
  initialValue?: number;
  finalValue: number;
  onInitialValueChange: (value: number) => void;
  onFinalValueChange: (value: number) => void;
  disabled?: boolean;
  minRange?: number;
  maxRange?: number;
  isDualSlider?: boolean;
};

const AlterscopeSlider: React.FC<SliderProps> = ({
  finalValue,
  onInitialValueChange,
  onFinalValueChange,
  disabled = false,
  minRange = 0,
  maxRange = 100,
  isDualSlider = false,
  initialValue = minRange,
  ...inputProps
}) => {
  const range = useRef<HTMLInputElement>(null);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);

  const { dark } = useConfigSelector();

  const thumbStyles =
    'thumb absolute outline-0 w-full pointer-events-none h-0 cursor-pointer z-20';

  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - minRange) / (maxRange - minRange)) * 100),
    [minRange, maxRange],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(initialValue);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [initialValue, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current || !isDualSlider) {
      const minPercent = getPercent(
        minValRef.current ? +minValRef.current.value : initialValue,
      );
      const maxPercent = getPercent(finalValue);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [finalValue, getPercent, initialValue, isDualSlider]);

  return (
    <div className="w-full relative">
      {isDualSlider && (
        <input
          {...inputProps}
          type="range"
          min={minRange}
          max={maxRange}
          value={initialValue}
          ref={minValRef}
          onChange={(event) => onInitialValueChange(+event.target.value)}
          className={`${thumbStyles} ${dark ? 'lightThumb' : 'darkThumb'}`}
          disabled={disabled}
        />
      )}
      <input
        {...inputProps}
        type="range"
        min={minRange}
        max={maxRange}
        value={finalValue}
        ref={maxValRef}
        onChange={(event) => onFinalValueChange(+event.target.value)}
        className={`${thumbStyles} ${dark ? 'lightThumb' : 'darkThumb'}`}
        disabled={disabled}
      />
      <div className="absolute w-full">
        <div className="bg-surface-dark dark:bg-surfaceDark-muted w-full z-0 absolute h-1.5" />
        <div
          ref={range}
          className={`absolute z-0 h-1.5 ${
            disabled
              ? 'bg-surface-muted dark:bg-surface-muted'
              : 'bg-primary dark:bg-primaryDark'
          }`}
        />
      </div>
    </div>
  );
};

export default AlterscopeSlider;
