import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '@/components/TabBarIcon/TabBarIcon';
import { TabBarParamList } from '@/navigation/TabBarNavigator/types';
import Gallery from '@/screens/Gallery/Gallery';
import Home from '@/screens/Home/Home';

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <TabBarIcon
              name={route.name as keyof TabBarParamList}
              color={color}
              size={size}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#121212',
          // Remove border top of tab bar
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 8,
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: '#6d6d6d',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Gallery" component={Gallery} />
    </Tab.Navigator>
  );
};

export default TabBarNavigator;
