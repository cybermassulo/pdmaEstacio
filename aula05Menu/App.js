// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  // Estado que controla qual tela está ativa
  const [activeScreen, setActiveScreen] = useState('Home');

  // Função que retorna a tela conforme o estado selecionado
  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Home Screen</Text>
            <Text>Bem-vindo à página inicial!</Text>
          </View>
        );
      case 'Usuários':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Usuários Screen</Text>
            <Text>Aqui estão os usuários.</Text>
          </View>
        );
      case 'Produtos':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Produtos Screen</Text>
            <Text>Confira nossos produtos.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu fixo para navegação */}
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => setActiveScreen('Home')}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('Usuários')}>
          <Text style={styles.menuItem}>Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('Produtos')}>
          <Text style={styles.menuItem}>Produtos</Text>
        </TouchableOpacity>
      </View>

      {/* Área onde a tela selecionada é exibida */}
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Espaço para a status bar
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ccc',
    paddingVertical: 10,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
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

export default App;
