import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Button, 
  Alert, 
  TextInput, 
  StyleSheet,
  StatusBar, 
  ScrollView 
} from 'react-native';

// Importa os estilos do arquivo separado
import styles from './styles';

const App = () => {
  // Estado para armazenar o nome do usuário digitado
  const [nome, setNome] = useState('');

  // Função para exibir alerta ao pressionar o botão
  const mostrarMensagem = () => {
    Alert.alert('Bem-vindo!', `Olá, ${nome || 'visitante'}!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Barra de status personalizada */}
      <StatusBar backgroundColor="#6200EE" barStyle="light-content" />

      <View style={styles.container}>
        {/* Imagem do Logo */}
        <Image 
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
          style={styles.logo} 
        />

        {/* Título da tela */}
        <Text style={styles.title}>Meu Primeiro App React Native</Text>

        {/* Entrada de texto para nome do usuário */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#888"
          onChangeText={setNome}
        />

        {/* Botão para exibir a mensagem */}
        <Button 
          title="Diga Olá" 
          onPress={mostrarMensagem} 
          color="#6200EE"
        />
      </View>
    </ScrollView>
  );
};

export default App;
