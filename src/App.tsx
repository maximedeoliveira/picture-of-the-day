import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Navigator from '@/navigation/Navigator';
import DataProvider from '@/providers/DataProvider/DataProvider';
import ThemeProvider from '@/providers/ThemeProvider/ThemeProvider';

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <Navigator />
      </ThemeProvider>
    </DataProvider>
  );
}

registerRootComponent(App);
