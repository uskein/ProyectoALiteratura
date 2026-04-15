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

const CreateBestiaryScreen = ({ navigation, route }) => {
  const { createBestiary } = useProjects();
  const { worldId } = route.params;
  
  const [creatureName, setCreatureName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [characteristics, setCharacteristics] = useState('');
  const [fauna, setFauna] = useState('');
  const [foodChain, setFoodChain] = useState('');
  const [entityType, setEntityType] = useState('Animal');
  const [feeding, setFeeding] = useState('Carnivore');
  const [folklore, setFolklore] = useState('');
  const [description, setDescription] = useState('');

  const entityTypes = ['Animal', 'Mythical', 'Demon', 'Spirit', 'Plant', 'Hybrid', 'Other'];
  const feedingTypes = ['Carnivore', 'Herbivore', 'Omnivore', 'Parasite', 'Energy', 'Other'];

  const handleCreateBestiary = () => {
    if (!creatureName.trim()) {
      Alert.alert('Error', 'El nombre de la criatura es requerido');
      return;
    }

    const bestiaryData = {
      worldId,
      name: creatureName.trim(),
      imageUrl: imageUrl.trim(),
      characteristics: characteristics.trim(),
      fauna: fauna.trim(),
      foodChain: foodChain.trim(),
      entityType,
      feeding,
      folklore: folklore.trim(),
      description: description.trim(),
    };

    const newBestiary = createBestiary(bestiaryData);
    Alert.alert(
      'Criatura Creada',
      `"${newBestiary.name}" ha sido añadida al bestiario`,
      [
        {
          text: 'Ver Bestiario',
          onPress: () => {
            navigation.navigate('WorldDetail', { worldId });
          }
        },
        {
          text: 'Crear Otra',
          style: 'cancel',
          onPress: () => {
            setCreatureName('');
            setImageUrl('');
            setCharacteristics('');
            setFauna('');
            setFoodChain('');
            setEntityType('Animal');
            setFeeding('Carnivore');
            setFolklore('');
            setDescription('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Bestiario</Text>
        <Text style={styles.subtitle}>Añade criaturas a tu mundo</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre de la Criatura *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Dragón, Kraken"
            value={creatureName}
            onChangeText={setCreatureName}
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
          <Text style={styles.label}>Tipo de Entidad</Text>
          <View style={styles.chipContainer}>
            {entityTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  entityType === type && styles.chipSelected
                ]}
                onPress={() => setEntityType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    entityType === type && styles.chipTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alimentación</Text>
          <View style={styles.chipContainer}>
            {feedingTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  feeding === type && styles.chipSelected
                ]}
                onPress={() => setFeeding(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    feeding === type && styles.chipTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Características Físicas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe las características físicas..."
            value={characteristics}
            onChangeText={setCharacteristics}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fauna / Hábitat</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el hábitat y fauna relacionada..."
            value={fauna}
            onChangeText={setFauna}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cadena Alimenticia</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Posición en la cadena alimenticia..."
            value={foodChain}
            onChangeText={setFoodChain}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Folclore / Leyendas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Historias, mitos o leyendas sobre esta criatura..."
            value={folklore}
            onChangeText={setFolklore}
            multiline
            numberOfLines={4}
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

        <TouchableOpacity style={styles.createButton} onPress={handleCreateBestiary}>
          <Text style={styles.createButtonText}>Añadir al Bestiario</Text>
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
    backgroundColor: '#ff6b6b',
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
    color: '#ffe0e0',
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
    borderColor: '#ff6b6b',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#ff6b6b',
  },
  chipText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#ff6b6b',
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

export default CreateBestiaryScreen;
