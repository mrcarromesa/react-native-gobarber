import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppRoutes;
