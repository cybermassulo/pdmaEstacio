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
    if (isFocused) {
      fetchReunioes();
    }
  }, [isFocused]);

  async function fetchReunioes() {
    const all = await loadReunioes();
    // ordena cronologicamente pela data
    all.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
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

  const renderItem = ({ item }) => {
    const dt = new Date(item.dataHora);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.info}>
          {/* Assunto */}
          <Text style={styles.assunto}>{item.assunto}</Text>
          {/* Pauta */}
          <Text style={styles.pauta}>{item.pauta}</Text>
          {/* Data e Hora */}
          <View style={styles.datetimeRow}>
            <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
            <Text style={styles.time}>{dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
          {/* Número de convidados */}
          <Text style={styles.participants}>
            Convidados: {item.convidados?.length ?? 0}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleDetails(item.id)} style={styles.iconButton}>
            <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.iconButton}>
            <Ionicons name="create-outline" size={24} color="#34C759" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reunioes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum agendamento encontrado.ListScree</Text>
        }
        contentContainerStyle={reunioes.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />

      {/* botão flutuante para agendar nova reunião */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ReuniaoForm')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
