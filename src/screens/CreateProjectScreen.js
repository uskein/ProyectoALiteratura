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

const CreateProjectScreen = ({ navigation }) => {
  const { createProject } = useProjects();
  
  const [projectName, setProjectName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [worldType, setWorldType] = useState('Fantasy');

  const genres = [
    'Fantasy',
    'Science Fiction',
    'Horror',
    'Mystery',
    'Romance',
    'Historical',
    'Contemporary',
    'Dystopian',
    'Other'
  ];

  const worldTypes = [
    'Fantasy',
    'Sci-Fi',
    'Real World',
    'Alternate History',
    'Post-Apocalyptic',
    'Urban Fantasy',
    'Custom'
  ];

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'El nombre del proyecto es requerido');
      return;
    }

    const projectData = {
      name: projectName.trim(),
      author: authorName.trim(),
      genre,
      description: description.trim(),
      worldType,
      status: 'active',
    };

    const newProject = createProject(projectData);
    Alert.alert(
      'Proyecto Creado',
      `El proyecto "${newProject.name}" ha sido creado exitosamente`,
      [
        {
          text: 'OK',
          onPress: () => {
            setProjectName('');
            setAuthorName('');
            setGenre('');
            setDescription('');
            setWorldType('Fantasy');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Nuevo Proyecto</Text>
        <Text style={styles.subtitle}>Comienza a construir tu mundo literario</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Proyecto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: El Reino de las Sombras"
            value={projectName}
            onChangeText={setProjectName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Autor</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre o seudónimo"
            value={authorName}
            onChangeText={setAuthorName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Género Literario</Text>
          <View style={styles.chipContainer}>
            {genres.map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.chip,
                  genre === g && styles.chipSelected
                ]}
                onPress={() => setGenre(g)}
              >
                <Text
                  style={[
                    styles.chipText,
                    genre === g && styles.chipTextSelected
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe brevemente tu proyecto..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
          <Text style={styles.createButtonText}>Crear Proyecto</Text>
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
    backgroundColor: '#6200ee',
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
    borderColor: '#6200ee',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#6200ee',
  },
  chipText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#6200ee',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6200ee',
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

export default CreateProjectScreen;
