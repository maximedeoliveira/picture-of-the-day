import React, { PropsWithChildren } from 'react';
import { PaperProvider } from 'react-native-paper';
import { MD3DarkTheme as DefaultTheme } from 'react-native-paper';

type ThemeProviderProps = PropsWithChildren;

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: { ...DefaultTheme.colors, primary: 'rgb(244, 67, 54)' },
};

const ThemeProvider = (props: ThemeProviderProps) => {
  return <PaperProvider theme={theme}>{props.children}</PaperProvider>;
};

export default ThemeProvider;
