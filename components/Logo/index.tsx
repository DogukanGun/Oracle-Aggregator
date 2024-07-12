import Image, { ImageProps } from 'next/image';
import logoDark from '@/public/logo-dark.png';
import logoWideDark from '@/public/logo-wd-dark.png';
import logoWide from '@/public/logo-wd.png';
import logo from '@/public/logo.png';
import React, { useMemo } from 'react';

type P = Omit<ImageProps, 'alt' | 'src'> & {
  /** Use the wider version of the logo */
  wide?: boolean;
  /** Use logo optimised for dark background */
  dark?: boolean;
};

/** Renders Alterscope logo */
const Logo = ({ wide, dark, ...props }: P) => {
  const src = useMemo(() => {
    if (wide) {
      if (dark) return logoWideDark;
      else return logoWide;
    }
    if (dark) return logoDark;
    return logo;
  }, [dark, wide]);
  return <Image {...props} alt="alterscope-logo" src={src} />;
};

export default Logo;
