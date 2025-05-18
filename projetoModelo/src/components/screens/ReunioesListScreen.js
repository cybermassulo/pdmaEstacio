import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { exportarCSV } from '../../utils/csvExport';

import styles from '../../styles/ReunioesListScreenStyles'
import { loadReunioes, saveReunioes } from '../../storage/reunioesStorage'
import { formatDateTime } from '../../utils/dateHelpers'

export default function ReunioesListScreen({ navigation }) {
  const [reunioes, setReunioes] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    fetchReunioes()
  }, [isFocused])

  async function fetchReunioes() {
    const all = await loadReunioes()
    all.sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    )
    setReunioes(all)
  }

  const handleDelete = id => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta Reunião?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const all = await loadReunioes()
            const filtered = all.filter(r => r.id !== id)
            await saveReunioes(filtered)
            fetchReunioes()
          }
        }
      ]
    )
  }

  const handleEdit = id => {
    navigation.navigate('ReuniaoForm', { reuniaoId: id })
  }

  const handleDetails = id => {
    navigation.navigate('ReuniaoDetail', { reuniaoId: id })
  }

  const renderItem = ({ item }) => {
    const formatted = formatDateTime(item.dateTime)
    const [datePart, timePart] = formatted.split(' ')
    return (
      <View style={styles.itemContainer}>
        <View style={styles.info}>
          <Text style={styles.pauta}>{item.pauta}</Text>
          <Text style={styles.date}>{datePart} às {timePart}</Text>
          
          <Text style={styles.convidados}>
            Convidados: {item.convidados?.length || 0}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleDetails(item.id)}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#007AFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <Ionicons name="create-outline" size={24} color="#34C759" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reunioes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma Reunião encontrado.
          </Text>
        }
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => exportarCSV(reunioes)}
        >
          <Ionicons name="download-outline" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ReuniaoForm')}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
