import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useProjects } from '../context/ProjectContext';

export default function CreateMagicScreen({ route, navigation }) {
  const { worldId, worldName } = route.params;
  const { createMagic } = useProjects();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [type, setType] = useState('Sistema Mágico');
  const [source, setSource] = useState('');
  const [limitations, setLimitations] = useState('');
  const [linkedCharacters, setLinkedCharacters] = useState('');
  const [linkedBestiary, setLinkedBestiary] = useState('');
  const [linkedFauna, setLinkedFauna] = useState('');
  const [linkedLocations, setLinkedLocations] = useState('');
  const [linkedContinents, setLinkedContinents] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    const magicData = {
      name,
      description,
      imageUri,
      type,
      source,
      limitations,
      linkedCharacters: linkedCharacters.split(',').map(c => c.trim()).filter(c => c),
      linkedBestiary: linkedBestiary.split(',').map(b => b.trim()).filter(b => b),
      linkedFauna: linkedFauna.split(',').map(f => f.trim()).filter(f => f),
      linkedLocations: linkedLocations.split(',').map(l => l.trim()).filter(l => l),
      linkedContinents: linkedContinents.split(',').map(c => c.trim()).filter(c => c),
      worldId,
    };

    createMagic(magicData);
    Alert.alert('Éxito', 'Sistema de magia creado correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Sistema de Magia</Text>
        <Text style={styles.subtitle}>{worldName}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Magia Elemental, Hechicería Arcana"
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Ej: Sistema Mágico, Escuela, Tradición"
        />

        <Text style={styles.label}>Fuente de Poder</Text>
        <TextInput
          style={styles.input}
          value={source}
          onChangeText={setSource}
          placeholder="¿De dónde proviene la magia?"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción detallada del sistema mágico..."
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Limitaciones/Reglas</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={limitations}
          onChangeText={setLimitations}
          placeholder="Restricciones, costos, consecuencias..."
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>URL de Imagen</Text>
        <TextInput
          style={styles.input}
          value={imageUri}
          onChangeText={setImageUri}
          placeholder="https://ejemplo.com/imagen.jpg"
        />

        <Text style={styles.label}>Personajes Vinculados (separados por coma)</Text>
        <TextInput
          style={styles.input}
          value={linkedCharacters}
          onChangeText={setLinkedCharacters}
          placeholder="Nombre1, Nombre2"
        />

        <Text style={styles.label}>Bestiario Vinculado (separado por coma)</Text>
        <TextInput
          style={styles.input}
          value={linkedBestiary}
          onChangeText={setLinkedBestiary}
          placeholder="Criatura1, Criatura2"
        />

        <Text style={styles.label}>Fauna Vinculada (separada por coma)</Text>
        <TextInput
          style={styles.input}
          value={linkedFauna}
          onChangeText={setLinkedFauna}
          placeholder="Especie1, Especie2"
        />

        <Text style={styles.label}>Localizaciones Vinculadas (separadas por coma)</Text>
        <TextInput
          style={styles.input}
          value={linkedLocations}
          onChangeText={setLinkedLocations}
          placeholder="Lugar1, Lugar2"
        />

        <Text style={styles.label}>Continentes Vinculados (separados por coma)</Text>
        <TextInput
          style={styles.input}
          value={linkedContinents}
          onChangeText={setLinkedContinents}
          placeholder="Continente1, Continente2"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  header: {
    backgroundColor: '#9370DB',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#DCD0FF',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D8BFD8',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#9370DB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
