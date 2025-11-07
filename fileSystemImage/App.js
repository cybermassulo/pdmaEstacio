import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import Constants from 'expo-constants';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [...prevLogs, `[${timestamp}] [${type.toUpperCase()}] ${message}`]);
    console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
  };

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios || Constants.platform.android) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          addLog('Permissão para acessar a galeria de mídia foi negada!', 'error');
          Alert.alert('Permissão Necessária', 'Precisamos da permissão para acessar sua galeria de fotos para que você possa selecionar imagens.');
        } else {
          addLog('Permissão para acessar a galeria de mídia concedida.', 'success');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    addLog('Iniciando o processo de seleção de imagem...');
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const sourceUri = result.assets[0].uri;
        addLog(`Imagem selecionada: ${sourceUri}`);

        const filename = sourceUri.split('/').pop();
        const directory = FileSystem.documentDirectory + 'my_app_images/';

        await FileSystem.makeDirectoryAsync(directory, { intermediates: true }).catch(e => {
            if (e.code !== 'EEXIST') {
                addLog(`Erro ao criar diretório: ${e.message}`, 'error');
                throw e; // erro se não for apenas o diretório já existente
            }
        });
        addLog(`Diretório ${directory} verificado/criado.`);

        const newPath = directory + filename;
        addLog(`Tentando copiar a imagem para: ${newPath}`);

        try {
          await FileSystem.copyAsync({
            from: sourceUri,
            to: newPath,
          });
          setImageUri(newPath);
          addLog(`Imagem salva com sucesso em: ${newPath}`, 'success');
          Alert.alert("Sucesso!", "Imagem salva localmente com sucesso!");
        } catch (error) {
          addLog(`Erro ao salvar imagem: ${error.message}`, 'error');
          Alert.alert("Erro ao salvar imagem", `Não foi possível salvar a imagem: ${error.message}`);
        }
      } else {
        addLog('Seleção de imagem cancelada pelo usuário.');
      }
    } catch (error) {
      addLog(`Erro inesperado durante a seleção da imagem: ${error.message}`, 'error');
      Alert.alert("Erro", `Ocorreu um erro inesperado: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria Interna</Text>
      <Text style={styles.subtitle}>Selecione uma imagem da sua galeria e salve localmente</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.pathText}>Salva em: {imageUri}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A2A2A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  pathText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  logsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A2A2A',
    marginTop: 30,
    marginBottom: 10,
  },
  logsContainer: {
    backgroundColor: '#E9EEF3',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#D1D9E6',
  },
  logText: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2,
    fontFamily: 'monospace',
  },
});