import { registerRootComponent } from 'expo';
import React from 'react';

import Navigator from '@/navigation/Navigator';

function App() {
  return <Navigator />;
}

registerRootComponent(App);
