import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PercentIcon from '@mui/icons-material/Percent';
import type { Navigation } from '@toolpad/core';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { auth } from '../auth';
import theme from '../theme';
import StoreProvider from "@/app/StoreProvider";

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'damage',
    title: 'Damage',
    icon: <PercentIcon />,
  },
];

const BRANDING = {
  title: 'Floppy Disc Zero',
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SessionProvider session={session}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <AppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                session={session}
                authentication={AUTHENTICATION}
                theme={theme}
              >
                {props.children}
              </AppProvider>
            </AppRouterCacheProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
