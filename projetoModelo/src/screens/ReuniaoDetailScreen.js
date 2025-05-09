import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from '../styles/ReuniaoDetailScreenStyles';
import {
  loadReunioes,
  deleteReuniao
} from '../storage/reunioesStorage';
import { loadPessoas } from '../storage/pessoasStorage';
import { formatDateTime } from '../utils/dateHelpers';

export default function ReuniaoDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [reuniao, setReuniao] = useState(null);
  const [pessoasMap, setPessoasMap] = useState({});

  useEffect(() => {
    loadReunioes().then(all => {
      const r = all.find(x => x.id === id);
      setReuniao(r || null);
    });
    loadPessoas().then(ps => {
      const m = {};
      ps.forEach(p => (m[p.id] = p));
      setPessoasMap(m);
    });
  }, []);

  if (!reuniao) {
    return (
      <View style={styles.container}>
        <Text>Agendamento não encontrado.</Text>
      </View>
    );
  }

  const onDelete = () => {
    Alert.alert(
      'Confirmação',
      'Deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await deleteReuniao(id);
            navigation.popToTop();
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes da Reunião</Text>

      <Text style={styles.label}>Data e Hora:</Text>
      <Text style={styles.value}>{formatDateTime(reuniao.dateTime)}</Text>

      <Text style={styles.label}>Pauta:</Text>
      <Text style={styles.value}>{reuniao.pauta}</Text>

      <Text style={styles.label}>Convidados:</Text>
      {reuniao.convidados.map(cid => (
        <Text key={cid} style={styles.value}>
          • {pessoasMap[cid]?.nome} ({pessoasMap[cid]?.papel})
        </Text>
      ))}

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ReuniaoForm', { id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
