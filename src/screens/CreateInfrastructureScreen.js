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

export default function CreateInfrastructureScreen({ route, navigation }) {
  const { worldId, worldName } = route.params;
  const { createInfrastructure, getInfrastructureByWorldId } = useProjects();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [type, setType] = useState('Tecnología');
  const [locations, setLocations] = useState('');
  const [nations, setNations] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    const infrastructureData = {
      name,
      description,
      imageUri,
      type,
      locations: locations.split(',').map(l => l.trim()).filter(l => l),
      nations: nations.split(',').map(n => n.trim()).filter(n => n),
      worldId,
    };

    createInfrastructure(infrastructureData);
    Alert.alert('Éxito', 'Infraestructura/Tecnología creada correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nueva Infraestructura/Tecnología</Text>
        <Text style={styles.subtitle}>{worldName}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Magia Industrial, Redes de Teletransporte"
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Ej: Tecnología, Infraestructura, Sistema Mágico"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción detallada..."
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>URL de Imagen</Text>
        <TextInput
          style={styles.input}
          value={imageUri}
          onChangeText={setImageUri}
          placeholder="https://ejemplo.com/imagen.jpg"
        />

        <Text style={styles.label}>Localizaciones (separadas por coma)</Text>
        <TextInput
          style={styles.input}
          value={locations}
          onChangeText={setLocations}
          placeholder="Ciudad A, Región B, Zona C"
        />

        <Text style={styles.label}>Naciones (separadas por coma)</Text>
        <TextInput
          style={styles.input}
          value={nations}
          onChangeText={setNations}
          placeholder="Nación X, Imperio Y, Reino Z"
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
    backgroundColor: '#F5F5DC',
  },
  header: {
    backgroundColor: '#8B7355',
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
    color: '#E8DCC4',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D4E37',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D4C4A8',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8B7355',
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
