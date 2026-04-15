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

const CreateTimelineScreen = ({ navigation, route }) => {
  const { createTimeline } = useProjects();
  const { worldId } = route.params;
  
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [linkedStory, setLinkedStory] = useState('');
  const [linkedCharacter, setLinkedCharacter] = useState('');
  const [linkedCreature, setLinkedCreature] = useState('');
  const [era, setEra] = useState('');
  const [importance, setImportance] = useState('Medium');

  const importanceLevels = ['Low', 'Medium', 'High', 'Critical'];

  const handleCreateTimeline = () => {
    if (!eventName.trim()) {
      Alert.alert('Error', 'El nombre del evento es requerido');
      return;
    }

    const timelineData = {
      worldId,
      name: eventName.trim(),
      date: date.trim(),
      description: description.trim(),
      linkedStory: linkedStory.trim(),
      linkedCharacter: linkedCharacter.trim(),
      linkedCreature: linkedCreature.trim(),
      era: era.trim(),
      importance,
    };

    const newTimeline = createTimeline(timelineData);
    Alert.alert(
      'Evento Creado',
      `"${newTimeline.name}" ha sido añadido a la línea de tiempo`,
      [
        {
          text: 'Ver Línea de Tiempo',
          onPress: () => {
            navigation.navigate('WorldDetail', { worldId });
          }
        },
        {
          text: 'Crear Otro',
          style: 'cancel',
          onPress: () => {
            setEventName('');
            setDate('');
            setDescription('');
            setLinkedStory('');
            setLinkedCharacter('');
            setLinkedCreature('');
            setEra('');
            setImportance('Medium');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Línea de Tiempo</Text>
        <Text style={styles.subtitle}>Registra eventos históricos de tu mundo</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Evento *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: La Gran Guerra, El Primer Amanecer"
            value={eventName}
            onChangeText={setEventName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Fecha / Año</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Año 1000, Era 3"
              value={date}
              onChangeText={setDate}
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Era / Período</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Primera Era"
              value={era}
              onChangeText={setEra}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Importancia</Text>
          <View style={styles.chipContainer}>
            {importanceLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.chip,
                  importance === level && styles.chipSelected
                ]}
                onPress={() => setImportance(level)}
              >
                <Text
                  style={[
                    styles.chipText,
                    importance === level && styles.chipTextSelected
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción del Evento</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe qué sucedió en este evento..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Historia Vinculada</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de historia o leyenda relacionada..."
            value={linkedStory}
            onChangeText={setLinkedStory}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Personaje Vinculado</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del personaje relacionado..."
            value={linkedCharacter}
            onChangeText={setLinkedCharacter}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Criatura Vinculada (Bestiario)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de criatura relacionada..."
            value={linkedCreature}
            onChangeText={setLinkedCreature}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateTimeline}>
          <Text style={styles.createButtonText}>Añadir a Línea de Tiempo</Text>
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
    backgroundColor: '#ffd93d',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
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
    borderColor: '#ffd93d',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#ffd93d',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#ffd93d',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ffd93d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateTimelineScreen;
