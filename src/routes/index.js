import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export default function Routes() {
  const { signed } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
