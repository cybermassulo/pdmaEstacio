import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { COLORS } from '../styles/drawerStyles';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.logoWrapper}>
        <Image
          source={{
            uri:
              'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-0.png'
          }}
          style={styles.logo}
        />
      </View>

      <View style={styles.itemsWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

