// src/screens/ReuniaoFormScreen.js
import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox'
import styles from '../styles/ReuniaoFormScreenStyles'
import { loadPessoas } from '../storage/pessoasStorage'

export default function ReuniaoFormScreen({ route, navigation }) {
  // se vier um draft (edição), usamos; senão criamos novo
  const draft = route.params?.reuniaoDraft

  // estado para data/hora
  const [date, setDate] = useState(
    draft?.dateTime ? new Date(draft.dateTime) : new Date()
  )
  const [showPicker, setShowPicker] = useState(false)
  const [mode, setMode] = useState('date')

  // pauta e convidados
  const [pauta, setPauta] = useState(draft?.pauta || '')
  const [convidados, setConvidados] = useState(draft?.convidados || [])

  // lista de todas as pessoas para multi-seleção
  const [pessoas, setPessoas] = useState([])
  useEffect(() => {
    loadPessoas().then(setPessoas)
  }, [])

  // dispara o DateTimePicker
  function showMode(currentMode) {
    setMode(currentMode)
    setShowPicker(true)
  }
  const showDatepicker = () => showMode('date')
  const showTimepicker = () => showMode('time')

  // callback do picker
  function onChange(_, selected) {
    setShowPicker(false)
    if (selected) {
      setDate(selected)
    }
  }

  // alterna convidado na lista
  function toggleConvidado(id) {
    setConvidados((old) =>
      old.includes(id) ? old.filter((i) => i !== id) : [...old, id]
    )
  }

  // envia para confirmação
  function onReview() {
    navigation.navigate('ReuniaoConfirm', {
      reuniaoDraft: {
        id: draft?.id,                             // se editar, mantém o id
        dateTime: date.toISOString(),
        pauta,
        convidados,
      },
    })
  }

  const canReview = pauta.trim() && convidados.length > 0

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={showDatepicker}
      >
        <Text style={styles.pickerText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Hora</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={showTimepicker}
      >
        <Text style={styles.pickerText}>
          {date.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}

      <Text style={styles.label}>Pauta</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe a pauta"
        value={pauta}
        onChangeText={setPauta}
      />

      <Text style={styles.label}>Convidados</Text>
      {pessoas.map((p) => (
        <View key={p.id} style={styles.convidadoItem}>
          <Checkbox
            value={convidados.includes(p.id)}
            onValueChange={() => toggleConvidado(p.id)}
          />
          <Text style={styles.convidadoText}>{p.nome}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.reviewButton, { opacity: canReview ? 1 : 0.5 }]}
        disabled={!canReview}
        onPress={onReview}
      >
        <Text style={{ color: '#fff', textAlign: 'center', padding: 12, fontWeight: '600' }}>
          Revisar Agendamento
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
