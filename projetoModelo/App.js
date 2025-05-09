// App.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator }   from '@react-navigation/drawer';
import { createStackNavigator }    from '@react-navigation/stack';
import { Ionicons }                from '@expo/vector-icons';

import PessoasListScreen    from './src/screens/PessoasListScreen';
import PessoaFormScreen     from './src/screens/PessoaFormScreen';
import ReunioesListScreen   from './src/screens/ReunioesListScreen';
import ReuniaoFormScreen    from './src/screens/ReuniaoFormScreen';
import ReuniaoConfirmScreen from './src/screens/ReuniaoConfirmScreen';
import ReuniaoDetailScreen  from './src/screens/ReuniaoDetailScreen';

const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();

// Opções comuns para todos os stacks, com toggleDrawer ou goBack
const stackScreenOptions = ({ navigation }) => ({
  headerShown: true,
  headerLeft: () => (
    navigation.canGoBack() ? (
      // botão de voltar
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
    ) : (
      // botão de menu (hamburger)
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 16 }}>
        <Ionicons name="menu" size={28} color="#000" />
      </TouchableOpacity>
    )
  ),
});

function PessoasStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="PessoasList"
        component={PessoasListScreen}
        options={{ title: 'Lista de Pessoas' }}
      />
      <Stack.Screen
        name="PessoaForm"
        component={PessoaFormScreen}
        options={{ title: 'Cadastro de Pessoa' }}
      />
    </Stack.Navigator>
  );
}

function ReunioesStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="ReunioesList"
        component={ReunioesListScreen}
        options={{ title: 'Reuniões Agendadas' }}
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

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Reuniões"
        screenOptions={({ route }) => ({
          headerShown: false,  // Drawer não precisa de header
          drawerIcon: ({ color, size }) => {
            const icons = {
              Pessoas:  'people-outline',
              Reuniões: 'calendar-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen
          name="Reuniões"
          component={ReunioesStack}
          options={{ drawerLabel: 'Reuniões' }}
        />
        <Drawer.Screen
          name="Pessoas"
          component={PessoasStack}
          options={{ drawerLabel: 'Pessoas' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
