import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function UsuariosScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Usuários Screen</Text>
      <Text>Aqui estão os usuários.</Text>
    </View>
  );
}