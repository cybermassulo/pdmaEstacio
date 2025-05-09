import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function ProdutosScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Produtos Screen</Text>
      <Text>Confira nossos produtos.</Text>
    </View>
  );
}