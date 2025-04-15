// Importa a biblioteca React e o hook useState para gerenciar estados em componentes funcionais
import React, { useState } from 'react';
// Importa componentes essenciais do React Native para construção da interface
import { 
  View,        // Contêiner para agrupar outros componentes
  Text,        // Componente para exibir textos
  Image,       // Componente para exibir imagens
  Button,      // Componente para botões
  Alert,       // API para exibir caixas de diálogo de alerta
  TextInput,   // Campo de entrada de texto
  StatusBar,   // Componente para customizar a barra de status do dispositivo
  ScrollView   // Contêiner que permite rolagem do conteúdo
} from 'react-native';

// Importa os estilos definidos em um arquivo separado para manter o código organizado
import styles from './styles';

// Componente principal do aplicativo
const App = () => {
  // Cria um estado chamado 'nome' para armazenar o nome digitado pelo usuário.
  // A função 'setNome' atualiza esse estado sempre que o usuário digita algo.
  const [nome, setNome] = useState('');

  // Função que exibe um alerta de boas-vindas quando o botão é pressionado.
  // Se o usuário não tiver digitado um nome, a mensagem usará 'visitante' como valor padrão.
  const mostrarMensagem = () => {
    Alert.alert('Bem-vindo!', `Olá, ${nome || 'visitante'}!`);
  };

  // A função retorna a estrutura de componentes que serão renderizados na tela.
  // O ScrollView permite a rolagem caso o conteúdo ultrapasse o tamanho da tela.
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Componente StatusBar: personaliza a aparência da barra de status */}
      <StatusBar backgroundColor="#6200EE" barStyle="light-content" />

      {/* View serve como contêiner principal para os elementos da tela */}
      <View style={styles.container}>
        {/* Componente Image: exibe uma imagem a partir de uma URL */}
        <Image 
          source={{ uri: 'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-1.png' }} 
          style={styles.logo} 
        />

        {/* Componente Text: exibe o título do aplicativo */}
        <Text style={styles.title}>Meu Primeiro App React Native</Text>

        {/* Componente TextInput: permite que o usuário digite seu nome.
            - 'placeholder' exibe um texto indicativo quando o campo está vazio.
            - 'placeholderTextColor' define a cor do texto do placeholder.
            - 'onChangeText' atualiza o estado 'nome' conforme o usuário digita. */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#888"
          onChangeText={setNome}
        />

        {/* Componente Button: cria um botão que, ao ser pressionado, executa a função 'mostrarMensagem' */}
        <Button 
          title="Diga Olá" 
          onPress={mostrarMensagem} 
          color="#6200EE"
        />
      </View>
    </ScrollView>
  );
};

//  Exporta o componente App para que ele possa ser utilizado em outras partes do aplicativo
export default App;
