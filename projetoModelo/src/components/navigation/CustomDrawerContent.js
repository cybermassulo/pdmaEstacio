import React from 'react';
import { View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import LogoImage from '../../../assets/logo.png';
import styles from '../../styles/drawerStyles';

export default function CustomDrawerContent(props) {
  
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerScroll}
    >
      <View style={styles.logoWrapper}>
        <Image
          source={LogoImage}
          style={styles.logo}
        />
      </View>

      <View style={styles.itemsWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

