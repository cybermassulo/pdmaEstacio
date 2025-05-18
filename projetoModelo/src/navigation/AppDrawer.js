import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import PessoasStack  from './PessoasStack';
import ReunioesStack from './ReunioesStack';
import styles from '../styles/drawerStyles';


const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Reunioes"
      drawerContent={props => (
        <DrawerContentScrollView contentContainerStyle={styles.drawerScroll}>
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
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerIcon: ({ color, size }) => {
          // map our ASCII route keys to icons
          const icons = {
            Reunioes: 'calendar-outline',
            Pessoas:  'people-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
      drawerStyle={styles.drawerStyle}
      drawerContentOptions={styles.drawerContentOptions}
    >
      {/* route name is ASCII-safe, but drawerLabel is accented */}
      <Drawer.Screen
        name="Reunioes"
        component={ReunioesStack}
        options={{ drawerLabel: 'Reuniaes' }}
      />

      <Drawer.Screen
        name="Pessoas"
        component={PessoasStack}
        options={{ drawerLabel: 'Pessoas' }}
      />
    </Drawer.Navigator>
  );
}
