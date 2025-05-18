import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

import styles from '../../styles/PessoaFormScreenStyles';
import { savePessoas, loadPessoas } from '../../storage/pessoasStorage';
import {
  validateEmail,
  validateCPF,
  maskCPF,
  maskPhone,
  validatePhone
} from '../../utils/validation';

export default function PessoaFormScreen({ navigation, route }) {
  const initialForm = { nome:'', email:'', telefone:'', cpf:'', papel:'popular' };
  const pessoaToEdit = route.params?.pessoa;
  const isEditing = Boolean(pessoaToEdit);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? 'Editar Pessoa' : 'Nova Pessoa'
    });
  }, [navigation, isEditing]);

  useEffect(() => {
    if (isEditing) {
      setForm({
        nome:  pessoaToEdit.nome,
        email: pessoaToEdit.email,
        telefone: maskPhone(pessoaToEdit.telefone),
        cpf:     maskCPF(pessoaToEdit.cpf),
        papel:   pessoaToEdit.papel
      });
    } else {
      setForm(initialForm);
    }
  }, [isEditing, pessoaToEdit]);

  const onBlurField = (field) => {
    let message = '';
    const v = form[field].trim();
    if (!v) {
      message = 'Campo obrigatório';
    } else {
      if (field === 'email' && !validateEmail(v)) {
        message = 'E-mail inválido';
      }
      if (field === 'cpf' && !validateCPF(v)) {
        message = 'CPF inválido';
      }
      if (field === 'telefone' && !validatePhone(v)) {
        message = 'Telefone inválido';
      }
    }
    setErrors((e) => ({ ...e, [field]: message }));
  };

  const onChange = (field, value) => {
    if (field === 'telefone') {
      setForm((f) => ({ ...f, telefone: maskPhone(value) }));
    } else if (field === 'cpf') {
      setForm((f) => ({ ...f, cpf: maskCPF(value) }));
    } else {
      setForm((f) => ({ ...f, [field]: value }));
    }
    setErrors((e) => ({ ...e, [field]: null }));
  };

  const hasErrors = () => {
    const required = ['nome', 'email', 'telefone', 'cpf'];
    return required.some(f => !form[f].trim() || errors[f]);
  };

  const onSave = async () => {
    // dispara validações de blur
    ['nome','email','telefone','cpf'].forEach(onBlurField);

    if (hasErrors()) {
      Alert.alert('Erro', 'Por favor, corrija os erros antes de salvar.');
      return;
    }
    if (!validateEmail(form.email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }
    if (!validateCPF(form.cpf)) {
      Alert.alert('Erro', 'CPF inválido.');
      return;
    }
    if (!validatePhone(form.telefone)) {
      Alert.alert('Erro', 'Telefone inválido.');
      return;
    }

    const pessoas = await loadPessoas();
    const existe = pessoas.some(p =>
      p.cpf === form.cpf && (!isEditing || p.id !== pessoaToEdit.id)
    );
    if (existe) {
      Alert.alert('Erro', 'Este CPF já foi cadastrado.');
      return;
    }

    let listaAtualizada;
    if (isEditing) {
      listaAtualizada = pessoas.map(p =>
        p.id === pessoaToEdit.id ? { ...pessoaToEdit, ...form } : p
      );
    } else {
      const nova = { id: uuid.v4(), ...form };
      listaAtualizada = [...pessoas, nova];
    }

    await savePessoas(listaAtualizada);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={form.nome}
          onChangeText={v => onChange('nome', v)}
          onBlur={() => onBlurField('nome')}
        />
        {errors.nome ? <Text style={styles.error}>{errors.nome}</Text> : null}

        <Text style={styles.label}>E-mail *</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={v => onChange('email', v)}
          onBlur={() => onBlurField('email')}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <Text style={styles.label}>Telefone *</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={form.telefone}
          onChangeText={v => onChange('telefone', v)}
          onBlur={() => onBlurField('telefone')}
          placeholder="(99) 99999-9999"
          maxLength={15}
        />
        {errors.telefone ? <Text style={styles.error}>{errors.telefone}</Text> : null}

        <Text style={styles.label}>CPF *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={form.cpf}
          onChangeText={v => onChange('cpf', v)}
          onBlur={() => onBlurField('cpf')}
          placeholder="000.000.000-00"
          maxLength={14}
        />
        {errors.cpf ? <Text style={styles.error}>{errors.cpf}</Text> : null}

        <Text style={styles.label}>Papel *</Text>
        <Picker
          selectedValue={form.papel}
          onValueChange={v => onChange('papel', v)}
          style={styles.picker}
        >
          <Picker.Item label="Popular" value="popular" />
          <Picker.Item label="Funcionário" value="funcionario" />
          <Picker.Item label="Presidente" value="presidente" />
        </Picker>

        <TouchableOpacity
          style={[styles.button, hasErrors() && styles.buttonDisabled]}
          onPress={onSave}
          disabled={hasErrors()}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
