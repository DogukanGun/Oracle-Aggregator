import React, { HTMLProps } from 'react';
import CustomInputField from '../CustomInputField';
import CustomSlider from '../CustomSlider';

type RangeSelectorProps = HTMLProps<HTMLInputElement> & {
  isShowSlider?: boolean;
  isShowInput?: boolean;
  initialValue?: number;
  finalValue?: number;
  onSetInitialValue?: (value: number) => void;
  onSetFinalValue?: (value: number) => void;
  disabled?: boolean;
  minRange?: number;
  maxRange?: number;
  containerClasses?: string;
  isDualSlider?: boolean;
};

const AlterscopeRangeSelector: React.FC<RangeSelectorProps> = ({
  initialValue = 0,
  finalValue = 0,
  onSetInitialValue,
  onSetFinalValue,
  isShowSlider = true,
  isShowInput = true,
  disabled = false,
  minRange = 0,
  maxRange = 100,
  containerClasses,
  isDualSlider,
  ...inputProps
}) => {
  const onInitialValueChange = (value: number) => {
    if (!onSetInitialValue) return;
    const val = Math.min(value, finalValue - 1);
    onSetInitialValue(val);
  };
  const onFinalValueChange = (value: number) => {
    if (!onSetFinalValue) return;
    const val = Math.max(value, initialValue + 1);
    onSetFinalValue(val);
  };

  return (
    <div
      className={containerClasses ?? 'space-y-4 border rounded-3xl p-3 w-full '}
    >
      {isShowSlider && (
        <div className="pb-2 w-full">
          <CustomSlider
            {...inputProps}
            initialValue={initialValue}
            finalValue={finalValue}
            onInitialValueChange={onInitialValueChange}
            onFinalValueChange={onFinalValueChange}
            minRange={minRange}
            maxRange={maxRange}
            disabled={disabled}
            isDualSlider={isDualSlider}
          />
        </div>
      )}
      {isShowInput && (
        <div className="flex space-x-3">
          <CustomInputField
            max={maxRange}
            min={minRange}
            type="number"
            name="from"
            placeholder="from"
            value={initialValue}
            onChange={onInitialValueChange}
            disabled={disabled}
          />
          <hr className="h-px my-6 border-0 bg-black w-[12px]" />
          <CustomInputField
            max={maxRange}
            type="number"
            name="to"
            placeholder="to"
            value={finalValue}
            onChange={onFinalValueChange}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default AlterscopeRangeSelector;
