import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'SignUp' }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
