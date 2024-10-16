import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React, {
  HTMLProps,
  RefObject,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Stack, { StackPropsType } from '../Stack';
import Typography from '../Typography';
import FAIcon from '../Icon';

/** Props for the TextField component */
export type TextFieldPropsType = {
  /** Label shown above the field */
  label?: string;
  /** Value of the field */
  value?: string;
  /** Called when the text is changed
   * @param value The new value
   */
  onTextChange?: (value: string) => void;
  /** Error to show on text field */
  error?: string;
  /** Indicates successful input, useful for validation */
  success?: boolean;
  /** Icon to show on the text field */
  icon?: IconDefinition | React.ReactElement;
  /** Shows icon to the right of text field */
  iconRight?: boolean;
  /** Props for the input element */
  inputProps?: HTMLProps<HTMLInputElement> & {
    ref?: RefObject<HTMLInputElement>;
  };
  /** Props for the input wrapper element */
  wrapperProps?: HTMLProps<HTMLDivElement>;
  /** Props for the root container stack */
  containerProps?: StackPropsType;
  /** If the field should be rounded */
  rounded?: boolean;
};

/** Renders TextField for text input */
export default forwardRef<HTMLDivElement, TextFieldPropsType>(
  function TextField(
    {
      label,
      value,
      error,
      success,
      icon,
      iconRight,
      inputProps = {},
      wrapperProps,
      containerProps,
      onTextChange,
      rounded,
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputFocused, setInputFocused] = useState(false);

    const wrapperClasses = useMemo(() => {
      const classes = [
        'border px-4 items-center py-2 text-typography dark:text-typographyDark bg-surface-light dark:bg-surfaceDark-light',
      ];
      if (inputFocused) classes.push('border-2');
      if (inputProps && !inputProps.disabled) classes.push('cursor-text');
      else classes.push('hover:bg-surface dark:hover:bg-surfaceDark');
      if (error) classes.push('border-error dark:border-errorDark');
      else if (success) classes.push('border-success dark:border-successDark');
      else classes.push('border-surface-dark dark:border-surfaceDark-dark');
      if (rounded) classes.push('rounded-xxl');
      else classes.push('rounded-xs');
      if (wrapperProps?.className) classes.push(wrapperProps.className);
      return classes.join(' ');
    }, [
      error,
      success,
      rounded,
      wrapperProps?.className,
      inputProps?.disabled,
      inputFocused,
    ]);

    useEffect(() => {
      const ref = inputRef.current;
      if (!ref) return;
      const focus = () => setInputFocused(true);
      const blur = () => setInputFocused(false);

      ref.addEventListener('focus', focus);
      ref.addEventListener('blur', blur);

      return () => {
        ref.removeEventListener('focus', focus);
        ref.removeEventListener('blur', blur);
      };
    }, [inputRef]);

    const Icon = useMemo(() => {
      if (icon && 'icon' in icon) return <FAIcon icon={icon} size="lg" />;
      return icon;
    }, [icon]);

    return (
      <Stack spacing={3} {...containerProps} ref={ref}>
        {label && <Typography variant="subtitle1" text={label} />}
        <Stack
          isRow
          spacing={2.5}
          {...wrapperProps}
          ref={null}
          onClick={(e) => {
            const ref = inputProps.ref ?? inputRef;
            ref.current?.focus();
            wrapperProps?.onClick?.(e);
          }}
          className={wrapperClasses}
          style={inputFocused ? { margin: -1 } : {}}
        >
          {!iconRight && Icon}
          <input
            {...inputProps}
            ref={inputProps.ref ?? inputRef}
            className={`outline-none border-none m-0 p-0 flex-grow bg-transparent ${
              inputProps?.className ? inputProps.className : ''
            }`}
            onChange={(e) => {
              onTextChange?.(e.target.value);
              inputProps?.onChange?.(e);
            }}
            value={value}
          />
          {iconRight && Icon}
        </Stack>
        {error && (
          <Typography
            className="text-error dark:text-errorDark text-right"
            variant="body2"
            disableDefaultColor
            text={error}
          />
        )}
      </Stack>
    );
  },
);
