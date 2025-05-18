import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppDrawer from './src/components/navigation/AppDrawer';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </>
  );
}