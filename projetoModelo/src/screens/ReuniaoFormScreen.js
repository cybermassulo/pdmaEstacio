// src/screens/ReunioesListScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import styles from '../styles/ReunioesListScreenStyles';
import {
  loadReunioes,
  deleteReuniao
} from '../storage/reunioesStorage';
import { formatDate, formatTime } from '../utils/validation';

export default function ReunioesListScreen({ navigation }) {
  const [reunioes, setReunioes] = useState([]);
  const isFocused = useIsFocused();

  // Recarrega sempre que a tela voltar a ficar em foco
  useEffect(() => {
    if (isFocused) {
      carregarReunioes();
    }
  }, [isFocused]);

  async function carregarReunioes() {
    const data = await loadReunioes();
    // ordena cronologicamente
    data.sort((a, b) => new Date(a.data) - new Date(b.data));
    setReunioes(data);
  }

  function handleEdit(id) {
    navigation.navigate('ReuniaoForm', { reuniaoId: id });
  }

  function handleDelete(id) {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteReuniao(id);
            carregarReunioes();
          }
        }
      ]
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.assunto}>{item.assunto}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleEdit(item.id)}>
              <Ionicons name="create-outline" size={20} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIcon}>
              <Ionicons name="trash-outline" size={20} color="#c00" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.pauta}>{item.pauta}</Text>
        <Text style={styles.datetime}>
          {formatDate(item.data)} às {formatTime(item.data)}
        </Text>
        <Text style={styles.guests}>Convidados: {item.convidados.length}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reunioes}
        keyExtractor={r => r.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum agendamento encontrado.</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ReuniaoForm')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
