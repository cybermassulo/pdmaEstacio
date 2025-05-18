import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton }  from '@react-navigation/drawer';

import PessoasListScreen from '../screens/PessoasListScreen';
import PessoaFormScreen  from '../screens/PessoaFormScreen';
import { COLORS }        from '../../styles/drawerStyles';

const Stack = createStackNavigator();

export default function PessoasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.lightBlue,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen
        name="PessoasList"
        component={PessoasListScreen}
        options={{
          title: 'Lista de Pessoas',
          headerLeft: () => <DrawerToggleButton tintColor={COLORS.white} />,
        }}
      />

      <Stack.Screen
        name="PessoaForm"
        component={PessoaFormScreen}
        options={{ title: 'Cadastro de Pessoa' }}
      />
    </Stack.Navigator>
  );
}
