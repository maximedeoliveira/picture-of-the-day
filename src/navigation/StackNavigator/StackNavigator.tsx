import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { StackParamList } from '@/navigation/StackNavigator/types';
import TabBarNavigator from '@/navigation/TabBarNavigator/TabBarNavigator';
import Picture from '@/screens/Picture/Picture';

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tab" component={TabBarNavigator} />
      <Stack.Screen name="Picture" component={Picture} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
