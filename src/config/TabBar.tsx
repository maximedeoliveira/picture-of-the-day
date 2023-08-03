import { HomeIcon, ImageIcon } from 'lucide-react-native';
import React, { ReactElement } from 'react';

import { TabBarParamList } from '@/navigation/TabBarNavigator/types';

export const TabBarRouteLabel: Record<keyof TabBarParamList, string> = {
  Home: 'Accueil',
  Gallery: 'Gallerie',
};

export const TabBarRouteIcon: Record<keyof TabBarParamList, ReactElement> = {
  Home: <HomeIcon />,
  Gallery: <ImageIcon />,
};
