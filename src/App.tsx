import { registerRootComponent } from 'expo';
import React from 'react';

import Navigator from '@/navigation/Navigator';
import DataProvider from '@/providers/DataProvider/DataProvider';
import ThemeProvider from '@/providers/ThemeProvider/ThemeProvider';

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </DataProvider>
  );
}

registerRootComponent(App);
