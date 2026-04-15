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

const CreateWorldScreen = ({ navigation, route }) => {
  const { createWorld } = useProjects();
  const { projectId } = route.params;
  
  const [worldName, setWorldName] = useState('');
  const [generalHistory, setGeneralHistory] = useState('');
  const [worldType, setWorldType] = useState('Fantasy');
  const [description, setDescription] = useState('');

  const worldTypes = [
    'Fantasy',
    'Sci-Fi',
    'Real World',
    'Alternate History',
    'Post-Apocalyptic',
    'Urban Fantasy',
    'Custom'
  ];

  const handleCreateWorld = () => {
    if (!worldName.trim()) {
      Alert.alert('Error', 'El nombre del mundo es requerido');
      return;
    }

    const worldData = {
      projectId,
      name: worldName.trim(),
      generalHistory: generalHistory.trim(),
      worldType,
      description: description.trim(),
      status: 'active',
    };

    const newWorld = createWorld(worldData);
    Alert.alert(
      'Mundo Creado',
      `El mundo "${newWorld.name}" ha sido creado exitosamente`,
      [
        {
          text: 'Ver Mundo',
          onPress: () => {
            navigation.navigate('WorldDetail', { worldId: newWorld.id });
          }
        },
        {
          text: 'Crear Otro',
          style: 'cancel',
          onPress: () => {
            setWorldName('');
            setGeneralHistory('');
            setWorldType('Fantasy');
            setDescription('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Nuevo Mundo</Text>
        <Text style={styles.subtitle}>Define las bases de tu universo literario</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Mundo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Terramar, Middle Earth"
            value={worldName}
            onChangeText={setWorldName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo de Mundo</Text>
          <View style={styles.chipContainer}>
            {worldTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  worldType === type && styles.chipSelected
                ]}
                onPress={() => setWorldType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    worldType === type && styles.chipTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Historia General *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe la historia general de este mundo..."
            value={generalHistory}
            onChangeText={setGeneralHistory}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción Adicional</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalles adicionales sobre el mundo..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateWorld}>
          <Text style={styles.createButtonText}>Crear Mundo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#7c4dff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 15,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7c4dff',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#7c4dff',
  },
  chipText: {
    color: '#7c4dff',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#7c4dff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#7c4dff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateWorldScreen;
