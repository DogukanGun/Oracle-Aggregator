import React from 'react';
import ThemeSwitch from '../ThemeSwitch';
import Logo from '../Logo';
import Icon from '../Icon';
import { faBars } from '@fortawesome/pro-regular-svg-icons';
import { useTheme } from '@/hooks/theme';
import { useBreakpointMatch } from '@/hooks/useBreakpointMatch';
import InputSearch from '../InputSearch';
import Stack from '../Stack';
import UserConfigService from '@/services/UserConfigService';
import { useRouter } from 'next/navigation';

export type HeaderPropsType = {
  /** Called when menu icon is clicked */
  onOpenMenu: () => void;
};

export default function Header({ onOpenMenu }: Readonly<HeaderPropsType>) {
  const {
    dimensions: { headerMobile },
  } = useTheme();
  const isMd = useBreakpointMatch('md');
  const router = useRouter()

  const handleChange = UserConfigService.toogleEvents;

  return (
    <div
      className="fixed top-0 left-0 md:static flex flex-row gap-2 justify-between md:justify-between items-center bg-surfaceDark-light dark:bg-surfaceDark md:dark:bg-transparent md:bg-transparent py-1 px-4 md:p-0 md:h-auto w-full z-40"
      style={{ height: isMd ? 'auto' : headerMobile.height }}
    >
      <Logo height={21} dark={false} wide className="block md:hidden" />
      <div className="hidden w-full md:flex flex-row justify-between">
        <div className="w-1/2" id='input_search'>
          <InputSearch />
        </div>

        <div id='theme_switch'>
          <Stack spacing={10} className="space-x-1" isRow>
            <Stack isRow spacing={3}>
              <ThemeSwitch />
            </Stack>
          </Stack>
        </div>
      </div>
      <Icon
        icon={faBars}
        size="xxl"
        className="block md:hidden text-white"
        onClick={onOpenMenu}
      />
    </div>
  );
}
