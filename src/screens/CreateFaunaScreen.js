import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useProjects } from '../context/ProjectContext';

const CreateFaunaScreen = ({ navigation, route }) => {
  const { createFauna } = useProjects();
  const { worldId } = route.params;
  
  const [faunaName, setFaunaName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [characteristics, setCharacteristics] = useState('');
  const [habitat, setHabitat] = useState('');
  const [type, setType] = useState('Plant');
  const [description, setDescription] = useState('');
  const [uses, setUses] = useState('');
  const [dangerLevel, setDangerLevel] = useState('Low');

  const faunaTypes = ['Plant', 'Animal', 'Fungus', 'Mineral', 'Hybrid'];
  const dangerLevels = ['None', 'Low', 'Medium', 'High', 'Extreme'];

  const handleCreateFauna = () => {
    if (!faunaName.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }

    const faunaData = {
      worldId,
      name: faunaName.trim(),
      imageUrl: imageUrl.trim(),
      characteristics: characteristics.trim(),
      habitat: habitat.trim(),
      type,
      description: description.trim(),
      uses: uses.trim(),
      dangerLevel,
    };

    const newFauna = createFauna(faunaData);
    Alert.alert(
      'Fauna Nativa Creada',
      `"${newFauna.name}" ha sido añadida al mundo`,
      [
        {
          text: 'Ver Fauna',
          onPress: () => {
            navigation.navigate('WorldDetail', { worldId });
          }
        },
        {
          text: 'Crear Otra',
          style: 'cancel',
          onPress: () => {
            setFaunaName('');
            setImageUrl('');
            setCharacteristics('');
            setHabitat('');
            setType('Plant');
            setDescription('');
            setUses('');
            setDangerLevel('Low');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Fauna Nativa</Text>
        <Text style={styles.subtitle}>Añade plantas y animales a tu mundo</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Árbol Lunar, Lobo de Cristal"
            value={faunaName}
            onChangeText={setFaunaName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL de Imagen</Text>
          <TextInput
            style={styles.input}
            placeholder="https://ejemplo.com/imagen.jpg"
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholderTextColor="#999"
          />
          {imageUrl ? (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.previewImage}
              resizeMode="cover"
            />
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.chipContainer}>
            {faunaTypes.map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.chip,
                  type === t && styles.chipSelected
                ]}
                onPress={() => setType(t)}
              >
                <Text
                  style={[
                    styles.chipText,
                    type === t && styles.chipTextSelected
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nivel de Peligro</Text>
          <View style={styles.chipContainer}>
            {dangerLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.chip,
                  dangerLevel === level && styles.chipSelected
                ]}
                onPress={() => setDangerLevel(level)}
              >
                <Text
                  style={[
                    styles.chipText,
                    dangerLevel === level && styles.chipTextSelected
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Características</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe características físicas, tamaño, color..."
            value={characteristics}
            onChangeText={setCharacteristics}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hábitat</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Dónde se encuentra, clima, región..."
            value={habitat}
            onChangeText={setHabitat}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usos / Propiedades</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Usos medicinales, alimenticios, mágicos..."
            value={uses}
            onChangeText={setUses}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción General</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Información adicional..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateFauna}>
          <Text style={styles.createButtonText}>Añadir Fauna Nativa</Text>
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
    backgroundColor: '#96ceb4',
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
    color: '#e8f5e9',
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
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
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
    borderColor: '#96ceb4',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#96ceb4',
  },
  chipText: {
    color: '#96ceb4',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#96ceb4',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#96ceb4',
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

export default CreateFaunaScreen;
