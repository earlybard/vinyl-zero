import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import PercentIcon from '@mui/icons-material/Percent';
import RefreshIcon from '@mui/icons-material/Refresh';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import type { Navigation } from '@toolpad/core';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { auth } from '../auth';
import theme from '../theme';
import StoreProvider from "@/app/StoreProvider";

// TODO this default nav from toolbox isn't quite good enough.
// I want to be able to remember when users have sections open.
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
    segment: 'agent',
    title: "Agent",
    icon: <PersonIcon />,

    children: [
      {
        segment: 'damage',
        title: 'Damage',
        icon: <PercentIcon />,
      },
      {
        segment: 'discs',
        title: 'Disc Drives',
        icon: <AlbumIcon />,
      },
      {
        segment: 'rotation',
        title: 'Rotation',
        icon: <RefreshIcon />,
      },
      {
        segment: 'buffs',
        title: 'Buffs',
        icon: <KeyboardDoubleArrowUpIcon />,
      },
      {
        segment: 'stats',
        title: 'Stat Weights',
        icon: <DonutSmallIcon />,
      },
      // {
      //   segment: 'wengine',
      //   title: 'W-Engine',
      //   icon: <DonutSmallIcon />,
      // },
      {
        segment: 'enemy',
        title: 'Enemy',
        icon: <GpsNotFixedIcon />,
      },
    ]
  }
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
