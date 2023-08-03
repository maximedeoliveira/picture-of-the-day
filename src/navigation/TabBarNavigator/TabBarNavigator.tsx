import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';

import TabBarIcon from '@/components/TabBarIcon/TabBarIcon';
import { TabBarParamList } from '@/navigation/TabBarNavigator/types';
import Gallery from '@/screens/Gallery/Gallery';
import Home from '@/screens/Home/Home';

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
  const theme = useTheme();

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
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
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
