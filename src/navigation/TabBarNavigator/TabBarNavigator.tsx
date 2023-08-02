import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '@/components/TabBarIcon/TabBarIcon';
import Gallery from '@/modules/gallery/screens/Gallery/Gallery';
import Home from '@/modules/home/screens/Home/Home';
import { TabBarParamList } from '@/navigation/TabBarNavigator/types';

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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Gallery" component={Gallery} />
    </Tab.Navigator>
  );
};

export default TabBarNavigator;
