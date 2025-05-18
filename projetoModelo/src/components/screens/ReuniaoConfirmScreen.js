import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../../styles/ReuniaoConfirmScreenStyles';
import { loadReunioes, saveReunioes } from '../../storage/reunioesStorage';
import { loadPessoas } from '../../storage/pessoasStorage';
import { formatDateTime } from '../../utils/dateHelpers';

export default function ReuniaoConfirmScreen({ route, navigation }) {
  const { reuniaoDraft } = route.params;

  const onConfirm = async () => {
    const all = await loadReunioes();
    const sem = all.filter(r => r.id !== reuniaoDraft.id);
    const novo = reuniaoDraft.id
      ? reuniaoDraft
      : { ...reuniaoDraft, id: uuid.v4() };
    await saveReunioes([...sem, novo]);
    navigation.popToTop();
  };

  const [pessoasMap, setPessoasMap] = React.useState({});
  React.useEffect(() => {
    loadPessoas().then(ps => {
      const m = {};
      ps.forEach(p => (m[p.id] = p));
      setPessoasMap(m);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Revise seu Reunião</Text>

      <Text style={styles.label}>Data e Hora:</Text>
      <Text style={styles.value}>{formatDateTime(reuniaoDraft.dateTime)}</Text>

      <Text style={styles.label}>Pauta:</Text>
      <Text style={styles.value}>{reuniaoDraft.pauta}</Text>

      <Text style={styles.label}>Convidados:</Text>
      {reuniaoDraft.convidados.map(id => (
        <Text key={id} style={styles.value}>
          • {pessoasMap[id]?.nome} ({pessoasMap[id]?.papel})
        </Text>
      ))}

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar e editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onConfirm}
        >
          <Text style={styles.buttonText}>Confirmar e Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
