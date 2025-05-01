import AsyncStorage from '@react-native-async-storage/async-storage';

const PESSOAS_KEY = '@app:pessoas';

export const loadPessoas = async () => {
  try {
    const json = await AsyncStorage.getItem(PESSOAS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Erro carregando pessoas', e);
    return [];
  }
};

export const savePessoas = async (pessoas) => {
  try {
    const json = JSON.stringify(pessoas);
    await AsyncStorage.setItem(PESSOAS_KEY, json);
  } catch (e) {
    console.error('Erro salvando pessoas', e);
  }
};

export const deletePessoa = async (id) => {
  try {
    const todas = await loadPessoas();
    const filtradas = todas.filter(p => p.id !== id);
    await savePessoas(filtradas);
  } catch (e) {
    console.error('Erro excluindo pessoa', e);
  }
};

export const updatePessoa = async (pessoaAtualizada) => {
  try {
    const todas = await loadPessoas();
    const atualizadas = todas.map(p =>
      p.id === pessoaAtualizada.id ? pessoaAtualizada : p
    );
    await savePessoas(atualizadas);
  } catch (e) {
    console.error('Erro atualizando pessoa', e);
  }
};


export const clearPessoas = async () => {
  try {
    await AsyncStorage.removeItem(PESSOAS_KEY);
    console.log('Storage de pessoas limpo.');
  } catch (e) {
    console.error('Erro ao limpar storage de pessoas', e);
  }
};

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage todo limpo.');
  } catch (e) {
    console.error('Erro ao limpar todo o AsyncStorage', e);
  }
};