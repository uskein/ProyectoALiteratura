import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useProjects } from '../context/ProjectContext';

export default function CreateChapterScreen({ route, navigation }) {
  const { worldId, worldName } = route.params;
  const { createChapter, getCharacterById, getBestiaryById, getFaunaById, getLocationById } = useProjects();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chapterNumber, setChapterNumber] = useState('1');
  const [linkedCharacters, setLinkedCharacters] = useState('');
  const [linkedBestiary, setLinkedBestiary] = useState('');
  const [linkedFauna, setLinkedFauna] = useState('');
  const [linkedLocations, setLinkedLocations] = useState('');
  const [linkedTimelines, setLinkedTimelines] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es requerido');
      return;
    }

    const chapterData = {
      title,
      content,
      chapterNumber: parseInt(chapterNumber) || 1,
      linkedCharacters: linkedCharacters.split(',').map(c => c.trim()).filter(c => c),
      linkedBestiary: linkedBestiary.split(',').map(b => b.trim()).filter(b => b),
      linkedFauna: linkedFauna.split(',').map(f => f.trim()).filter(f => f),
      linkedLocations: linkedLocations.split(',').map(l => l.trim()).filter(l => l),
      linkedTimelines: linkedTimelines.split(',').map(t => t.trim()).filter(t => t),
      worldId,
    };

    createChapter(chapterData);
    Alert.alert('Éxito', 'Capítulo creado correctamente');
    navigation.goBack();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Capítulo</Text>
        <Text style={styles.subtitle}>{worldName}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Número de Capítulo</Text>
        <TextInput
          style={styles.input}
          value={chapterNumber}
          onChangeText={setChapterNumber}
          placeholder="1"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: El Despertar del Dragón"
        />

        <Text style={styles.label}>Contenido del Capítulo</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Escribe el contenido del capítulo..."
          multiline
          numberOfLines={10}
        />

        <Text style={styles.label}>Personajes Vinculados (IDs o nombres)</Text>
        <TextInput
          style={styles.input}
          value={linkedCharacters}
          onChangeText={setLinkedCharacters}
          placeholder="ID1, ID2 o Nombre1, Nombre2"
        />

        <Text style={styles.label}>Bestiario Vinculado (IDs o nombres)</Text>
        <TextInput
          style={styles.input}
          value={linkedBestiary}
          onChangeText={setLinkedBestiary}
          placeholder="ID1, ID2 o Criatura1, Criatura2"
        />

        <Text style={styles.label}>Fauna Vinculada (IDs o nombres)</Text>
        <TextInput
          style={styles.input}
          value={linkedFauna}
          onChangeText={setLinkedFauna}
          placeholder="ID1, ID2 o Especie1, Especie2"
        />

        <Text style={styles.label}>Localizaciones Vinculadas (IDs o nombres)</Text>
        <TextInput
          style={styles.input}
          value={linkedLocations}
          onChangeText={setLinkedLocations}
          placeholder="ID1, ID2 o Lugar1, Lugar2"
        />

        <Text style={styles.label}>Líneas de Tiempo Vinculadas (IDs)</Text>
        <TextInput
          style={styles.input}
          value={linkedTimelines}
          onChangeText={setLinkedTimelines}
          placeholder="ID1, ID2"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.previewButton]} onPress={handlePreview}>
            <Text style={styles.buttonText}>Vista Previa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showPreview} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Vista Previa del Capítulo</Text>
            <TouchableOpacity onPress={() => setShowPreview(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.previewChapterNumber}>Capítulo {chapterNumber}</Text>
            <Text style={styles.previewTitle}>{title}</Text>
            <Text style={styles.previewContent}>{content || 'Sin contenido...'}</Text>
            
            {linkedCharacters ? (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Personajes:</Text>
                <Text style={styles.previewList}>{linkedCharacters}</Text>
              </View>
            ) : null}
            
            {linkedBestiary ? (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Bestiario:</Text>
                <Text style={styles.previewList}>{linkedBestiary}</Text>
              </View>
            ) : null}
            
            {linkedLocations ? (
              <View style={styles.previewSection}>
                <Text style={styles.previewSectionTitle}>Localizaciones:</Text>
                <Text style={styles.previewList}>{linkedLocations}</Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    backgroundColor: '#483D8B',
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
    color: '#E6E6FA',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#483D8B',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D8D8E6',
    fontSize: 16,
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  previewButton: {
    backgroundColor: '#6A5ACD',
  },
  saveButton: {
    backgroundColor: '#483D8B',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#483D8B',
    padding: 20,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  closeButton: {
    fontSize: 24,
    color: '#FFF',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  previewChapterNumber: {
    fontSize: 14,
    color: '#6A5ACD',
    fontWeight: '600',
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#483D8B',
    marginBottom: 16,
  },
  previewContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  previewSection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0F0FF',
    borderRadius: 8,
  },
  previewSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#483D8B',
    marginBottom: 8,
  },
  previewList: {
    fontSize: 14,
    color: '#666',
  },
});
