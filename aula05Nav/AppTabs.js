// npm install @react-navigation/native @react-navigation/bottom-tabs
// expo install react-native-screens react-native-safe-area-context
// expo install @expo/vector-icons

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

// Telas
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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Usuários') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Produtos') {
              iconName = focused ? 'cube' : 'cube-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1976D2', // azul ativo
          tabBarInactiveTintColor: 'gray', // cinza inativo
          tabBarStyle: {
            backgroundColor: '#E3F2FD', // fundo da tab bar
            paddingBottom: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
          },
          headerShown: false, // esconde o cabeçalho se desejar
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Usuários" component={UsuariosScreen} />
        <Tab.Screen name="Produtos" component={ProdutosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
