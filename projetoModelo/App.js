import 'react-native-reanimated';      
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppDrawer from './src/components/navigation/AppDrawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <StatusBar hidden />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppDrawer />
          </NavigationContainer>
        </GestureHandlerRootView>
    </>
  );
}
