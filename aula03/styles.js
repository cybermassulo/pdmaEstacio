import { StyleSheet } from 'react-native';

// Cria e exporta um objeto de estilos utilizando o StyleSheet do React Native
export default StyleSheet.create({
  // Estilo para o container que envolve a ScrollView,
  // permitindo que o conteúdo seja rolado e centralizado
  scrollContainer: {
    flexGrow: 1,           // Permite que o container cresça de acordo com o conteúdo
    justifyContent: 'center', // Centraliza os itens verticalmente
    alignItems: 'center',     // Centraliza os itens horizontalmente
  },
  // Estilo para o container principal da tela
  container: {
    flex: 1,               // Ocupa todo o espaço disponível na tela
    justifyContent: 'center', // Centraliza os itens verticalmente
    alignItems: 'center',     // Centraliza os itens horizontalmente
    padding: 30,           // Adiciona espaçamento interno de 30 pixels em todos os lados
    backgroundColor: '#F5F5F5', // Define uma cor de fundo clara para a tela
  },
  // Estilo para a imagem do logo
  logo: {
    width: 140,             // Define a largura da imagem
    height: 122,            // Define a altura da imagem
    marginBottom: 20,      // Espaço abaixo da imagem para separá-la dos elementos seguintes
  },
  // Estilo para o título do aplicativo
  title: {
    fontSize: 22,          // Tamanho da fonte do título
    fontWeight: 'bold',    // Torna o texto em negrito
    color: '#333',         // Define uma cor de texto escura
    marginBottom: 20,      // Espaço abaixo do título para separá-lo dos outros elementos
  },
  // Estilo para o campo de entrada de texto (TextInput)
  input: {
    width: 300,            // Largura do campo de entrada
    height: 50,            // Altura do campo de entrada
    borderWidth: 1,        // Define a espessura da borda
    borderColor: '#6200EE',// Cor da borda (roxo)
    borderRadius: 5,       // Bordas arredondadas com raio de 5 pixels
    paddingHorizontal: 10, // Espaçamento interno horizontal para evitar que o texto fique colado na borda
    fontSize: 16,          // Tamanho da fonte do texto digitado
    backgroundColor: '#FFF', // Fundo branco para o campo de entrada
    marginBottom: 20,       // Espaço abaixo do campo para separar dos elementos subsequentes
  },
});
