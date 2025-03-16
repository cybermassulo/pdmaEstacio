// TabContent.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './TabContentStyles';

const TabContent = () => {
  return (
    <View style={styles.tabsRow}>
      <Text style={styles.tabIcon}>[Grid]</Text>
      <Text style={styles.tabIcon}>[Reels]</Text>
      <Text style={styles.tabIcon}>[Tagged]</Text>
    </View>
  );
};

export default TabContent;
