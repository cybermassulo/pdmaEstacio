import AsyncStorage from '@react-native-async-storage/async-storage';

const REUNIOES_KEY = '@app:reunioes';

/**
 * Carrega todas as reuniões do AsyncStorage,
 * convertendo a string ISO de volta em Date.
 */
export const loadReunioes = async () => {
  try {
    const json = await AsyncStorage.getItem(REUNIOES_KEY);
    if (!json) return [];
    const arr = JSON.parse(json);
    // reconstrói Date
    return arr.map(r => ({
      ...r,
      dateTime: new Date(r.dateTime),
    }));
  } catch (e) {
    console.error('Erro carregando reuniões', e);
    return [];
  }
};

/**
 * Salva o array de reuniões no AsyncStorage,
 * convertendo Date em string ISO.
 */
export const saveReunioes = async (reunioes) => {
  try {
    const toStore = reunioes.map(r => ({
      ...r,
      dateTime: r.dateTime instanceof Date
        ? r.dateTime.toISOString()
        : String(r.dateTime),
    }));
    await AsyncStorage.setItem(REUNIOES_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Erro salvando reuniões', e);
  }
};
