import React, { CSSProperties, HTMLProps, useMemo } from 'react';

/** Props for the Divider component */
export type DividerPropsType = HTMLProps<HTMLDivElement> & {
  /** If the divider should be vertical (full height) */
  isVertical?: boolean;
  /** Margins around the divider. x4 pixels of provided margin. */
  margin?: Partial<{ t: number; b: number; l: number; r: number }>;
  /** Size of the divider in `px`. Translates to width or height based
   * on if divider is horizontal or vertical respectively.
   */
  size?: number;
};

/** Displays a divider line */
const Divider = ({
  isVertical,
  margin,
  size,
  className,
  ...props
}: DividerPropsType) => {
  const [classes, styles] = useMemo(() => {
    const classes = [];
    const styles: CSSProperties = {};
    if (isVertical) classes.push('h-full border-l');
    else classes.push('w-full border-t');
    classes.push('border-surface-dark dark:border-surfaceDark-dark');
    if (margin) {
      const { t, b, l, r } = margin;
      if (t) styles.marginTop = t * 4;
      if (b) styles.marginBottom = b * 4;
      if (l) styles.marginLeft = l * 4;
      if (r) styles.marginRight = r * 4;
    }
    if (isVertical) styles.height = size;
    else styles.width = size;
    classes.push(className);
    return [classes.join(' '), styles];
  }, [isVertical, margin, size, className]);

  return (
    <div {...props} className={classes} style={{ ...styles, ...props.style }} />
  );
};

export default Divider;
