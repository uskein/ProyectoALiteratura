import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useProjects } from '../context/ProjectContext';

const WorldDetailScreen = ({ navigation, route }) => {
  const { worldId } = route.params;
  const { 
    getWorldById, 
    getBestiariesByWorldId, 
    getCharactersByWorldId, 
    getFaunaByWorldId,
    getTimelinesByWorldId,
    getInfrastructureByWorldId,
    getGeologyByWorldId,
    getMagicsByWorldId,
    getReligionsByWorldId,
    getChaptersByWorldId,
    deleteWorld 
  } = useProjects();

  const world = getWorldById(worldId);
  const bestiaries = getBestiariesByWorldId(worldId);
  const characters = getCharactersByWorldId(worldId);
  const fauna = getFaunaByWorldId(worldId);
  const timelines = getTimelinesByWorldId(worldId);
  const infrastructure = getInfrastructureByWorldId(worldId);
  const geology = getGeologyByWorldId(worldId);
  const magics = getMagicsByWorldId(worldId);
  const religions = getReligionsByWorldId(worldId);
  const chapters = getChaptersByWorldId(worldId);

  const renderSection = (title, data, icon, createRoute, detailRoute) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionCount}>{data.length}</Text>
      </View>
      
      {data.length === 0 ? (
        <View style={styles.emptySection}>
          <Text style={styles.emptyText}>No hay elementos aún</Text>
        </View>
      ) : (
        <FlatList
          data={data.slice(0, 5)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
              {item.description && (
                <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate(createRoute, { worldId, worldName: world?.name })}
      >
        <Text style={styles.addButtonText}>+ Añadir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.worldName}>{world?.name || 'Mundo'}</Text>
        <Text style={styles.worldType}>{world?.worldType || ''}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Historia General</Text>
          <Text style={styles.infoText}>
            {world?.generalHistory || 'Sin historia definida'}
          </Text>
        </View>

        {renderSection('Bestiario', bestiaries, '🐉', 'CreateBestiary', 'BestiaryDetail')}
        {renderSection('Personajes', characters, '👤', 'CreateCharacter', 'CharacterDetail')}
        {renderSection('Fauna Nativa', fauna, '🌿', 'CreateFauna', 'FaunaDetail')}
        {renderSection('Línea de Tiempo', timelines, '📅', 'CreateTimeline', 'TimelineDetail')}
        {renderSection('Infraestructura y Tecnología', infrastructure, '⚙️', 'CreateInfrastructure', 'InfrastructureDetail')}
        {renderSection('Geología', geology, '🪨', 'CreateGeology', 'GeologyDetail')}
        {renderSection('Magias', magics, '✨', 'CreateMagic', 'MagicDetail')}
        {renderSection('Religiones', religions, '🙏', 'CreateReligion', 'ReligionDetail')}
        {renderSection('Capítulos', chapters, '📖', 'CreateChapter', 'ChapterDetail')}

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.createButton]}
            onPress={() => navigation.navigate('CreateWorld', { projectId: world?.projectId })}
          >
            <Text style={styles.actionButtonText}>Crear Otro Mundo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
  },
  worldName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  worldType: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c4dff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  sectionCount: {
    backgroundColor: '#7c4dff',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  emptySection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#7c4dff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    marginTop: 30,
    gap: 15,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#7c4dff',
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorldDetailScreen;
