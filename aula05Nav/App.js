// npm install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/drawer
// expo install react-native-gesture-handler react-native-reanimated

// App.js
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Tela Home
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Home Screen</Text>
      <Text>Bem-vindo à página inicial!</Text>
    </View>
  );
}

// Tela Usuários
function UsuariosScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Usuários Screen</Text>
      <Text>Aqui estão os usuários.</Text>
    </View>
  );
}

// Tela Produtos
function ProdutosScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Produtos Screen</Text>
      <Text>Confira nossos produtos.</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Usuários" component={UsuariosScreen} />
        <Drawer.Screen name="Produtos" component={ProdutosScreen} />
      </Drawer.Navigator>
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
