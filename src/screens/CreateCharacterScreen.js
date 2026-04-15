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

const CreateCharacterScreen = ({ navigation, route }) => {
  const { createCharacter } = useProjects();
  const { worldId } = route.params;
  
  const [characterName, setCharacterName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [physicalCharacteristics, setPhysicalCharacteristics] = useState('');
  const [origin, setOrigin] = useState('');
  const [past, setPast] = useState('');
  const [psychologicalCharacteristics, setPsychologicalCharacteristics] = useState('');
  const [background, setBackground] = useState('');
  const [linkedLocations, setLinkedLocations] = useState('');
  const [linkedBestiary, setLinkedBestiary] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleCreateCharacter = () => {
    if (!characterName.trim()) {
      Alert.alert('Error', 'El nombre del personaje es requerido');
      return;
    }

    const characterData = {
      worldId,
      name: characterName.trim(),
      imageUrl: imageUrl.trim(),
      physicalCharacteristics: physicalCharacteristics.trim(),
      origin: origin.trim(),
      past: past.trim(),
      psychologicalCharacteristics: psychologicalCharacteristics.trim(),
      background: background.trim(),
      linkedLocations: linkedLocations.trim(),
      linkedBestiary: linkedBestiary.trim(),
      age: age.trim(),
      occupation: occupation.trim(),
    };

    const newCharacter = createCharacter(characterData);
    Alert.alert(
      'Personaje Creado',
      `"${newCharacter.name}" ha sido añadido al mundo`,
      [
        {
          text: 'Ver Personajes',
          onPress: () => {
            navigation.navigate('WorldDetail', { worldId });
          }
        },
        {
          text: 'Crear Otro',
          style: 'cancel',
          onPress: () => {
            setCharacterName('');
            setImageUrl('');
            setPhysicalCharacteristics('');
            setOrigin('');
            setPast('');
            setPsychologicalCharacteristics('');
            setBackground('');
            setLinkedLocations('');
            setLinkedBestiary('');
            setAge('');
            setOccupation('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Personaje</Text>
        <Text style={styles.subtitle}>Da vida a los habitantes de tu mundo</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Personaje *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Aragorn, Harry Potter"
            value={characterName}
            onChangeText={setCharacterName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 35 años"
              value={age}
              onChangeText={setAge}
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Ocupación</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Guerrero, Mago"
              value={occupation}
              onChangeText={setOccupation}
              placeholderTextColor="#999"
            />
          </View>
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
          <Text style={styles.label}>Características Físicas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe apariencia física, altura, complexión..."
            value={physicalCharacteristics}
            onChangeText={setPhysicalCharacteristics}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Origen</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Lugar de nacimiento, cultura, familia..."
            value={origin}
            onChangeText={setOrigin}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pasado / Historia</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Eventos importantes de su pasado..."
            value={past}
            onChangeText={setPast}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Características Psicológicas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Personalidad, miedos, motivaciones, valores..."
            value={psychologicalCharacteristics}
            onChangeText={setPsychologicalCharacteristics}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Trasfondo / Background</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Historia completa del personaje..."
            value={background}
            onChangeText={setBackground}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lugares Vinculados</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ciudades, regiones o lugares importantes para el personaje..."
            value={linkedLocations}
            onChangeText={setLinkedLocations}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Criaturas Vinculadas (Bestiario)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Criaturas asociadas, mascotas, enemigos..."
            value={linkedBestiary}
            onChangeText={setLinkedBestiary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateCharacter}>
          <Text style={styles.createButtonText}>Crear Personaje</Text>
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
    backgroundColor: '#4ecdc4',
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
    color: '#e0f7f5',
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
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#4ecdc4',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4ecdc4',
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

export default CreateCharacterScreen;
