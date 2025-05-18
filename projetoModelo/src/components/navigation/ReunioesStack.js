import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton }  from '@react-navigation/drawer';

import ReunioesListScreen   from '../screens/ReunioesListScreen';
import ReuniaoFormScreen    from '../screens/ReuniaoFormScreen';
import ReuniaoConfirmScreen from '../screens/ReuniaoConfirmScreen';
import ReuniaoDetailScreen  from '../screens/ReuniaoDetailScreen';
import { COLORS } from '../../styles/drawerStyles';

const Stack = createStackNavigator();

export default function ReunioesStack() {
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
        name="ReunioesList"
        component={ReunioesListScreen}
        options={{
          title: 'Reuniões Agendadas',
          headerLeft: () => <DrawerToggleButton tintColor={COLORS.white} />,
        }}
      />

      <Stack.Screen
        name="ReuniaoForm"
        component={ReuniaoFormScreen}
        options={{ title: 'Agendar Reunião' }}
      />

      <Stack.Screen
        name="ReuniaoConfirm"
        component={ReuniaoConfirmScreen}
        options={{ title: 'Confirmar Agendamento' }}
      />

      <Stack.Screen
        name="ReuniaoDetail"
        component={ReuniaoDetailScreen}
        options={{ title: 'Detalhes da Reunião' }}
      />
    </Stack.Navigator>
  );
}
