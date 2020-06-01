import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TabIcon from '~/components/TabIcon';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

const New = createStackNavigator();

const NavNew = () => {
  return (
    <New.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        unmountOnBlur: true,
      }}
    >
      <New.Screen
        name="SelectProvider"
        options={{
          title: 'Selecione o prestador',
        }}
        component={SelectProvider}
      />
      <New.Screen name="SelectDateTime" component={SelectDateTime} />
      <New.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar',
        }}
      />
    </New.Navigator>
  );
};

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
        unmountOnBlur: true,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: (props) => <TabIcon {...props} iconName="event" />,
        }}
      />
      <Tab.Screen
        name="New"
        component={NavNew}
        options={{
          unmountOnBlur: true,
          tabBarVisible: false,
          tabBarLabel: 'Agendar',
          tabBarIcon: (props) => (
            <TabIcon {...props} iconName="add-circle-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (props) => <TabIcon {...props} iconName="person" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
