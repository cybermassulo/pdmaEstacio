// npm install @react-navigation/native
// npm install @react-navigation/stack
// expo install react-native-screens react-native-safe-area-context

import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
function HomeScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Home</Text>
      <Button title="Ir para Usuários" onPress={() => navigation.navigate('Usuários')} />
      <Button title="Ir para Produtos" onPress={() => navigation.navigate('Produtos')} />
    </View>
  );
}

function UsuariosScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Usuários</Text>
      <Text>Lista de usuários cadastrados.</Text>
    </View>
  );
}

function ProdutosScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Produtos</Text>
      <Text>Confira os produtos disponíveis.</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Usuários" component={UsuariosScreen} />
        <Stack.Screen name="Produtos" component={ProdutosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
