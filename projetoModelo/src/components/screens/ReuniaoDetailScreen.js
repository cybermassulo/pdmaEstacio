// src/screens/ReuniaoDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from '../../styles/ReuniaoDetailScreenStyles';
import {
  loadReunioes,
  saveReunioes
} from '../../storage/reunioesStorage';
import { loadPessoas } from '../../storage/pessoasStorage';
import { formatDateTime } from '../../utils/dateHelpers';

export default function ReuniaoDetailScreen({ route, navigation }) {
  // receber corretamente o id (podendo vir como reuniaoId ou id)
  const reuniaoId = route.params?.reuniaoId ?? route.params?.id;

  const [reuniao, setReuniao] = useState(null);
  const [pessoasMap, setPessoasMap] = useState({});

  useEffect(() => {
    if (!reuniaoId) return;

    // carrega todas as reuniões e seleciona a que bate com o id
    loadReunioes().then(all => {
      const r = all.find(x => x.id === reuniaoId);
      setReuniao(r || null);
    });

    // monta um mapa id → pessoa para mostrar nome/papel
    loadPessoas().then(ps => {
      const m = {};
      ps.forEach(p => (m[p.id] = p));
      setPessoasMap(m);
    });
  }, [reuniaoId]);

  if (!reuniao) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Reunião não encontrado.</Text>
      </View>
    );
  }

  const onDelete = () => {
    Alert.alert(
      'Cancelar reunião',
      'Deseja realmente cancelar este Reunião?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            const all = await loadReunioes()
            const filtered = all.filter(r => r.id !== reuniaoId)
            await saveReunioes(filtered)
            navigation.goBack()
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Detalhes da Reunião</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Data e Hora</Text>
        <Text style={styles.value}>
          {formatDateTime(reuniao.dateTime)}
        </Text>

        <Text style={styles.label}>Pauta</Text>
        <Text style={styles.value}>{reuniao.pauta}</Text>

        <Text style={styles.label}>Convidados</Text>
        {reuniao.convidados.map(cid => (
          <Text key={cid} style={styles.value}>
            • {pessoasMap[cid]?.nome} ({pessoasMap[cid]?.papel})
          </Text>
        ))}
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate('ReuniaoForm', {
              reuniaoDraft: { 
                id: reuniao.id,
                dateTime: reuniao.dateTime,
                pauta: reuniao.pauta,
                convidados: reuniao.convidados
              }
            })
          }
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
