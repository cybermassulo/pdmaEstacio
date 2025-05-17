import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nome, setNome] = useState('');
  const [nomes, setNomes] = useState([]);

  // Carrega os nomes ao iniciar o app
  useEffect(() => {
    carregarNomes();
  }, []);

  const salvarNome = async () => {
    try {
      if (nome.trim() === '') return;

      const novaLista = [...nomes, nome];
      await AsyncStorage.setItem('listaNomes', JSON.stringify(novaLista));
      setNomes(novaLista);
      setNome('');
    } catch (e) {
      console.log('Erro ao salvar:', e);
    }
  };

  const carregarNomes = async () => {
    try {
      const lista = await AsyncStorage.getItem('listaNomes');
      if (lista !== null) {
        setNomes(JSON.parse(lista));
      }
    } catch (e) {
      console.log('Erro ao carregar:', e);
    }
  };

  const removerNomeEspecifico = async () => {
    try {
      const novaLista = nomes.filter(item => item.toLowerCase() !== nome.trim().toLowerCase());
  
      if (novaLista.length === nomes.length) {
        alert("Nome não encontrado.");
        return;
      }
  
      await AsyncStorage.setItem('listaNomes', JSON.stringify(novaLista));
      setNomes(novaLista);
      setNome('');
      alert("Nome removido com sucesso!");
    } catch (e) {
      console.log('Erro ao remover nome específico:', e);
    }
  };

  const removerNomes = async () => {
    try {
      await AsyncStorage.removeItem('listaNomes');
      setNomes([]);
    } catch (e) {
      console.log('Erro ao remover:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Nomes</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.botoes}>
        <Button title="Salvar" onPress={salvarNome} />
        <Button title="Remover Tudo" color="red" onPress={removerNomes} />
        <Button title="Remover Nome" color="orange" onPress={removerNomeEspecifico} />
      </View>

      <Text style={styles.subtitulo}>📋 Lista de Nomes Salvos:</Text>

      <FlatList
        data={nomes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{index + 1}. {item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum nome salvo.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitulo: { marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  botoes: { flexDirection: 'column', gap: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  vazio: { fontStyle: 'italic', textAlign: 'center', marginTop: 10 }
});
