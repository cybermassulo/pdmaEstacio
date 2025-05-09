import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Home Screen</Text>
      <Text>Bem-vindo à página inicial!</Text>
    </View>
  );
}
