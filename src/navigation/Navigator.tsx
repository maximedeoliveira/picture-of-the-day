import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import TabBarNavigator from '@/navigation/TabBarNavigator/TabBarNavigator';

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabBarNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
