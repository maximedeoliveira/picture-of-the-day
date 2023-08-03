import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';

import TabBarIcon from '@/components/TabBarIcon/TabBarIcon';
import { TabBarRouteLabel } from '@/config/TabBar';
import { TabBarParamList } from '@/navigation/TabBarNavigator/types';
import Gallery from '@/screens/Gallery/Gallery';
import Home from '@/screens/Home/Home';
import Search from '@/screens/Search/Search';

const Tab = createBottomTabNavigator<TabBarParamList>();

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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: TabBarRouteLabel.Home }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{ tabBarLabel: TabBarRouteLabel.Gallery }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ tabBarLabel: TabBarRouteLabel.Search }}
      />
    </Tab.Navigator>
  );
};

export default TabBarNavigator;
