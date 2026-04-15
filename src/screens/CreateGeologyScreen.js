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

export default function CreateGeologyScreen({ route, navigation }) {
  const { worldId, worldName } = route.params;
  const { createGeology } = useProjects();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [type, setType] = useState('Formación Geológica');
  const [locations, setLocations] = useState('');
  const [minerals, setMinerals] = useState('');
  const [characteristics, setCharacteristics] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    const geologyData = {
      name,
      description,
      imageUri,
      type,
      locations: locations.split(',').map(l => l.trim()).filter(l => l),
      minerals: minerals.split(',').map(m => m.trim()).filter(m => m),
      characteristics,
      worldId,
    };

    createGeology(geologyData);
    Alert.alert('Éxito', 'Registro geológico creado correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Registro Geológico</Text>
        <Text style={styles.subtitle}>{worldName}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Montañas de Cristal, Depósitos de Mithril"
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="Ej: Formación Geológica, Mina, Volcán"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción detallada de la formación..."
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Características</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={characteristics}
          onChangeText={setCharacteristics}
          placeholder="Composición, edad, propiedades especiales..."
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

        <Text style={styles.label}>Localizaciones (separadas por coma)</Text>
        <TextInput
          style={styles.input}
          value={locations}
          onChangeText={setLocations}
          placeholder="Región A, Zona B, Área C"
        />

        <Text style={styles.label}>Minerales/Recursos (separados por coma)</Text>
        <TextInput
          style={styles.input}
          value={minerals}
          onChangeText={setMinerals}
          placeholder="Hierro, Oro, Cristales Mágicos"
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
    backgroundColor: '#DEB887',
  },
  header: {
    backgroundColor: '#8B4513',
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
    color: '#F5DEB3',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D3A1A',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D2B48C',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8B4513',
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
