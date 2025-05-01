// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import PessoaFormScreen from './src/screens/PessoaFormScreen';
import PessoasListScreen from './src/screens/PessoasListScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Pessoas"
        screenOptions={({ route }) => ({
          headerShown: true,
          drawerIcon: ({ color, size }) => {
            let iconName = 'person-outline';
            if (route.name === 'Pessoas')       iconName = 'people-outline';
            if (route.name === 'Reuniões')      iconName = 'calendar-outline';
            if (route.name === 'Configurações') iconName = 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* LISTAGEM */}
        <Drawer.Screen
          name="Pessoas"
          component={PessoasListScreen}
          options={{ title: 'Lista de Pessoas' }}
        />

        {/* FORM: escondido do drawer, mas ainda navegável por navigation.navigate('PessoaForm') */}
        <Drawer.Screen
          name="PessoaForm"
          component={PessoaFormScreen}
          options={{
            // height:0 torna o item invisível e inacessível pelo menu.
            drawerItemStyle: { height: 0 },
            // definindo o título padrão do header
            title: 'Nova Pessoa',
          }}
          listeners={({ navigation }) => ({
            // garantindo que sempre zere o param 'pessoa' ao abrir pelo drawer (se tentasse)
            drawerItemPress: (e) => {
              navigation.setParams({ pessoa: undefined });
            },
          })}
        />

        {/* outras telas... */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
