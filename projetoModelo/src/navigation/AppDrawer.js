// src/navigation/AppDrawer.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerToggleButton
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import PessoasStack     from './PessoasStack';
import ReunioesStack    from './ReunioesStack';
import { COLORS, drawerNavigatorStyle } from '../styles/drawerStyles';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Reuniões"
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerScroll}
        >
          <Image
            source={{
              uri:
                'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-0.png'
            }}
            style={styles.logo}
          />
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
      drawerStyle={drawerNavigatorStyle.drawerStyle}
      drawerContentOptions={drawerNavigatorStyle.drawerContentOptions}
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerIcon: ({ color, size }) => {
          const icons = {
            Reuniões: 'calendar-outline',
            Pessoas:  'people-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="Reuniões" component={ReunioesStack} />
      <Drawer.Screen name="Pessoas"  component={PessoasStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerScroll: {
    backgroundColor: COLORS.darkBlue,
    flex: 1,
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
});
