import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/components/homeScreen';
import ProdutosScreen from './src/components/produtosScreen';
import UsuariosScreen from './src/components/usuariosScreen';

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