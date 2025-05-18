import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  loadPessoas,
  deletePessoa,
  clearAllStorage,
} from '../../storage/pessoasStorage';

import styles from '../../styles/PessoasListScreenStyles';

export default function PessoasListScreen({ navigation }) {
  const [pessoas, setPessoas] = useState([]);

  const carregarPessoas = async () => {
    const all = await loadPessoas();
    setPessoas(all);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarPessoas);
    return unsubscribe;
  }, [navigation]);


  
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir esta pessoa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deletePessoa(id);
            carregarPessoas();
          },
        },
      ]
    );
  };

  const handleEdit = (item) => {
    navigation.navigate('PessoaForm', { pessoa: item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.sub}>
          {item.telefone} • {item.cpf}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
      <View style={styles.container}>
      <FlatList
        data={pessoas}
        keyExtractor={(p) => p.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma pessoa cadastrada</Text>} 
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('PessoaForm')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => {
        await clearAllStorage();
        Alert.alert('Pronto', 'Todo o armazenamento foi limpo.');
      }}>
        <Text>Limpar tudo</Text>
      </TouchableOpacity>
    </View>
  );
}
