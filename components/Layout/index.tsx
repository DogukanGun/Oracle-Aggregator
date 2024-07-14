'use client';

import { useTheme } from '@/hooks/theme';
import React, { HTMLProps, useEffect, useMemo, useState } from 'react';
import Surface from '../Surface';
import Sidebar from './Sidebar';
import { appRoutes, navRoutes } from '@/routes';
import Header from './Header';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store';
import { useAuthSelector, useConfigSelector } from '@/hooks/store';
import { usePathname, useRouter } from 'next/navigation';
import { FeedbackProvider } from '@/context';
import SessionService from '@/services/SessionService';
import Stack from '../Stack';
import Logo from '../Logo';
import Typography from '../Typography';
import { useBreakpointMatch } from '@/hooks/useBreakpointMatch';
import InputSearch from '../InputSearch';
import ScrollToTopButton from '../ScrollToTopButton';

export default function Layout(props: Readonly<HTMLProps<HTMLDivElement>>) {
  return (
    <ReduxProvider store={store}>
      <Container {...props} />
    </ReduxProvider>
  );
}

/** Loading messages */
const messages = {
  /** Initial state */
  start: 'Hold on',
  /** Session token loaded and verified */
  sessionLoad: 'Logged in!',
  /** Invalid or no token present, final state */
  finish: 'Finishing up',
};

function Container({ children }: Readonly<HTMLProps<HTMLDivElement>>) {
  const {
    colors,
    dimensions: { sidebar, headerMobile },
  } = useTheme();
  const auth = useAuthSelector();
  const router = useRouter();
  const pathname = usePathname();
  const { events } = useConfigSelector();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  const [message, setMessage] = useState(messages.start);
  const isMd = useBreakpointMatch('md');

  // Load session
  useEffect(() => {
    if (auth.user || loading) return;
    setLoading(true);
    SessionService.load()
      .then(() => setMessage(messages.sessionLoad))
      .catch(() => setMessage(messages.finish))
      .finally(() => setLoading(false));
  }, [auth]);

  const Component = useMemo(() => {
    const isAuth = pathname?.startsWith('/auth');
    const isProjects = pathname?.startsWith('/projects');
    const isTrade = pathname?.startsWith('/trade');
    const isToken = pathname?.startsWith('/token');
    const isFramework = pathname?.startsWith('/marketplace');
    const isRoot = pathname === '/';
    if (loading === false) {
      // Redirect to auth if not authorized
      if (!auth.session?.accessToken && !isAuth)
        if (!(isProjects || isRoot || isFramework || isTrade || isToken))
          router.replace(appRoutes.auth.login.self.path);
      // Redirect to app if authorizated and in auth flow
      if (auth.session?.accessToken && isAuth)
        router.replace(appRoutes.root.path);
    }
    let Component = (
      <>
        <Sidebar
          routes={navRoutes}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Stack
          spacing={2}
          className={`md:p-6 min-h-screen`}
          style={
            isMd
              ? { marginLeft: sidebar.width }
              : { marginTop: headerMobile.height }
          }
        >
          <Header onOpenMenu={() => setSidebarOpen(true)} />
          {!isMd && (
            <div className="my-2 mx-4">
              <InputSearch />
            </div>
          )}
          <div className="my-5 mx-4 md:m-0 md:mt-11">{children}</div>
        </Stack>
      </>
    );
    if (loading || loading === undefined)
      Component = (
        <Stack className="dark bg-surfaceDark w-screen h-screen items-center justify-center space-y-4">
          <div className="animate-pulse">
            <Logo width={64} height={64} />
          </div>
          <Typography text={message} color={colors.typographyDark.DEFAULT} />
        </Stack>
      );
    else if (isAuth) Component = <>{children}</>;
    return Component;
  }, [
    auth,
    pathname,
    router,
    loading,
    children,
    message,
    sidebar.width,
    headerMobile.height,
    sidebarOpen,
    isMd,
    colors.typographyDark.DEFAULT,
  ]);


  return (
    <MainWrapper>
      <Surface>{Component}</Surface>
      <ScrollToTopButton />
    </MainWrapper>
  );
}

const MainWrapper = (props: HTMLProps<HTMLElement>) => {
  const { isDark } = useTheme();
  const [classNames, setClassNames] = useState('');

  useEffect(() => {
    if (isDark) setClassNames('dark');
    else setClassNames('');
  }, [isDark]);

  return (
    <main className={classNames}>
      <FeedbackProvider>{props.children}</FeedbackProvider>
    </main>
  );
};
