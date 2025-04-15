import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = await SQLite.openDatabaseAsync('meubanco.db');

export default function App() {
  const [nome, setNome] = useState('');
  const [nomes, setNomes] = useState([]);

  // Habilita Promises
SQLite.enablePromise(true);

const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'meubanco.db',
      location: 'default', // obrigatório no Android
    });

    console.log("Banco de dados aberto!");
    return db;

  } catch (error) {
    console.error("Erro ao abrir o banco:", error);
  }
};

  // Cria a tabela ao iniciar o app
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);'
      );
    });

    listarNomes();
  }, []);

  // Insere novo nome
  const salvarNome = () => {
    if (nome.trim() === '') {
      Alert.alert('Digite um nome válido');
      return;
    }

    db.transaction(tx => {
      tx.executeSql('INSERT INTO usuarios (nome) VALUES (?);', [nome], (_, result) => {
        console.log("Nome salvo:", result);
        setNome('');
        listarNomes();
      });
    });
  };

  // Lista os nomes salvos
  const listarNomes = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM usuarios;', [], (_, { rows }) => {
        setNomes(rows._array);
      });
    });
  };

  // Apaga todos os nomes
  const limparNomes = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM usuarios;', [], () => {
        setNomes([]);
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite com React Native</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um nome"
        value={nome}
        onChangeText={setNome}
      />

      <Button title="Salvar Nome" onPress={salvarNome} />
      <Button title="Limpar Tudo" color="red" onPress={limparNomes} />

      <Text style={styles.subtitle}>Nomes Salvos:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nome}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { marginTop: 20, fontSize: 18, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
