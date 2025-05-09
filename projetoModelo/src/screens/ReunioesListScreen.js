// src/screens/ReunioesListScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import styles from '../styles/ReunioesListScreenStyles';
import { loadReunioes, saveReunioes } from '../storage/reunioesStorage';

export default function ReunioesListScreen({ navigation }) {
  const [reunioes, setReunioes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchReunioes();
  }, [isFocused]);

  async function fetchReunioes() {
    const all = await loadReunioes();
    // ordenar cronologicamente pelo campo date (ISO string)
    all.sort((a, b) => new Date(a.date) - new Date(b.date));
    setReunioes(all);
  }

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const all = await loadReunioes();
            const filtered = all.filter(r => r.id !== id);
            await saveReunioes(filtered);
            fetchReunioes();
          }
        }
      ]
    );
  };

  const handleEdit = (id) => {
    navigation.navigate('ReuniaoForm', { reuniaoId: id });
  };

  const handleDetails = (id) => {
    navigation.navigate('ReuniaoDetail', { reuniaoId: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <Text style={styles.pauta}>{item.pauta}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleDetails(item.id)}>
          <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Ionicons name="create-outline" size={24} color="#34C759" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reunioes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ReuniaoForm')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
