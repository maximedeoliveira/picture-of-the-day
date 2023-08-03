import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import StackNavigator from '@/navigation/StackNavigator/StackNavigator';

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
