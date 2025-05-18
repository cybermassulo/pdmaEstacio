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
import styles from '../../styles/ReuniaoFormScreenStyles'
import { loadPessoas } from '../../storage/pessoasStorage'
import { loadReunioes } from '../../storage/reunioesStorage'

export default function ReuniaoFormScreen({ route, navigation }) {
  // parâmetros vindos da navegação
  const reuniaoId = route.params?.reuniaoId
  const reuniaoDraft = route.params?.reuniaoDraft

  // estados principais
  const [id, setId] = useState(reuniaoDraft?.id || reuniaoId || null)
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [mode, setMode] = useState('date')
  const [pauta, setPauta] = useState('')
  const [convidados, setConvidados] = useState([])
  const [pessoas, setPessoas] = useState([])

  // carregar lista de pessoas para checklist
  useEffect(() => {
    loadPessoas().then(setPessoas)
  }, [])

  // se vier draft (pela confirmação de edição) ou vier reuniaoId, pré-carrega os campos
  useEffect(() => {
    if (reuniaoDraft) {
      // caso venha direto do Confirm (edição em sequência)
      setId(reuniaoDraft.id)
      setDate(new Date(reuniaoDraft.dateTime))
      setPauta(reuniaoDraft.pauta)
      setConvidados(reuniaoDraft.convidados)
    } else if (reuniaoId) {
      // carregamento inicial para edição
      loadReunioes().then(all => {
        const r = all.find(x => x.id === reuniaoId)
        if (r) {
          setId(r.id)
          setDate(new Date(r.dateTime))
          setPauta(r.pauta)
          setConvidados(r.convidados)
        }
      })
    }
  }, [reuniaoDraft, reuniaoId])

  // abrir picker data/hora
  function showMode(currentMode) {
    setMode(currentMode)
    setShowPicker(true)
  }
  const showDatepicker = () => showMode('date')
  const showTimepicker = () => showMode('time')

  // callback do picker
  function onChange(_, selected) {
    setShowPicker(false)
    if (selected) setDate(selected)
  }

  // alterna convidado selecionado
  function toggleConvidado(pid) {
    setConvidados(old =>
      old.includes(pid) ? old.filter(i => i !== pid) : [...old, pid]
    )
  }

  // avanços para confirmar
  function onReview() {
    navigation.navigate('ReuniaoConfirm', {
      reuniaoDraft: {
        id,                                        // mantém id se editar
        dateTime: date.toISOString(),
        pauta,
        convidados,
      }
    })
  }

  const canReview = pauta.trim().length > 0 && convidados.length > 0

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {id ? 'Editar Reunião' : 'Nova Reunião'}
      </Text>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={showDatepicker}>
        <Text style={styles.pickerText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Hora</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={showTimepicker}>
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
      {pessoas.map(p => (
        <View key={p.id} style={styles.convidadoItem}>
          <Checkbox
            value={convidados.includes(p.id)}
            onValueChange={() => toggleConvidado(p.id)}
            style={styles.checkbox}
          />
          <Text style={styles.convidadoText}>{p.nome}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.reviewButton,
          { backgroundColor: canReview ? '#007AFF' : '#AACCEE' }
        ]}
        disabled={!canReview}
        onPress={onReview}
      >
        <Text style={{ color: '#fff', textAlign: 'center', padding: 12, fontWeight: '600' }}>
          {id ? 'Atualizar Reunião' : 'Revisar Reunião'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}