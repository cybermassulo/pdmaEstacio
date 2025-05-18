// src/screens/ReuniaoFormScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { loadPessoas } from '../storage/pessoasStorage';

import styles from '../styles/ReuniaoFormScreenStyles';

export default function ReuniaoFormScreen({ navigation, route }) {
  // se vier reuniaoId, vamos editar, caso contrário é novo
  const { reuniaoId } = route.params || {};

  const [assunto, setAssunto] = useState('');
  const [pauta, setPauta] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date'); // 'date' ou 'time'
  const [pessoas, setPessoas] = useState([]);
  const [convidados, setConvidados] = useState([]);

  useEffect(() => {
    // carrega lista de pessoas para convidar
    (async () => {
      const all = await loadPessoas();
      setPessoas(all);
    })();
    // se tiver edição, poderia carregar aqui a reunião existente…
    // Exemplo:
    // if (reuniaoId) { carregar do storage e preencher estados }
  }, []);

  const onChangeDateTime = (event, selected) => {
    setShowPicker(false);
    if (event.type === 'dismissed') return;
    if (mode === 'date') {
      // escolheu data: atualiza e abre time
      const newDate = selected || dataHora;
      setDataHora(prev => {
        const dt = new Date(prev);
        dt.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
        return dt;
      });
      // agora pega hora
      setMode('time');
      setShowPicker(true);
    } else {
      // escolheu hora
      const newTime = selected || dataHora;
      setDataHora(prev => {
        const dt = new Date(prev);
        dt.setHours(newTime.getHours(), newTime.getMinutes());
        return dt;
      });
    }
  };

  const openPicker = () => {
    setMode('date');
    setShowPicker(true);
  };

  const toggleConvidado = (cpf) => {
    setConvidados(prev => {
      if (prev.includes(cpf)) {
        return prev.filter(c => c !== cpf);
      } else {
        return [...prev, cpf];
      }
    });
  };

  const handleConfirm = () => {
    if (!assunto.trim() || !pauta.trim() || convidados.length === 0) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione pelo menos um convidado.');
      return;
    }
    // navega pra tela de confirmação
    navigation.navigate('ReuniaoConfirm', {
      agendamento: {
        id: reuniaoId,
        assunto,
        pauta,
        dataHora: dataHora.toISOString(),
        convidados
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>

      <Text style={styles.label}>Assunto *</Text>
      <TextInput
        style={styles.input}
        value={assunto}
        onChangeText={setAssunto}
        placeholder="Digite o assunto"
      />

      <Text style={styles.label}>Pauta *</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={pauta}
        onChangeText={setPauta}
        placeholder="Descreva a pauta"
        multiline
      />

      <Text style={styles.label}>Data e Hora *</Text>
      <TouchableOpacity style={styles.dateButton} onPress={openPicker}>
        <Text style={styles.dateText}>
          {dataHora.toLocaleDateString()} {dataHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Ionicons name="calendar" size={20} color="#333" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={dataHora}
          mode={mode}
          display="default"
          onChange={onChangeDateTime}
        />
      )}

      <Text style={styles.label}>Convidados *</Text>
      {pessoas.length === 0 && (
        <Text style={styles.emptyText}>Cadastre pessoas primeiro em “Pessoas”.</Text>
      )}
      {pessoas.map(p => (
        <View key={p.id} style={styles.checkboxRow}>
          <Checkbox
            value={convidados.includes(p.cpf)}
            onValueChange={() => toggleConvidado(p.cpf)}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>{p.nome} ({p.cpf})</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
