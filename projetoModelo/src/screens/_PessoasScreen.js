import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadPessoas } from '../storage/pessoasStorage';

export default function PessoasScreen({ navigation }) {
  const [pessoas, setPessoas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadPessoas().then(setPessoas);
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.role}>{item.papel}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma pessoa cadastrada.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('PessoaForm')}
      >
        <Text style={styles.addButtonText}>+ Novo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#666' },
  empty: { textAlign: 'center', marginTop: 32, color: '#666' },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007AFF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  addButtonText: { color: '#fff', fontSize: 16 },
});
