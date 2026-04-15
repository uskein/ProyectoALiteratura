# Módulo de Mundos - ALiteratura

## Descripción General

Este módulo permite la creación y gestión completa de mundos literarios dentro de un proyecto. Cada mundo puede contener:

- **Historia General**: Descripción del universo y su contexto
- **Bestiario**: Criaturas y entidades del mundo
- **Personajes**: Habitantes con trasfondo detallado
- **Fauna Nativa**: Plantas y animales nativos
- **Línea de Tiempo**: Eventos históricos vinculados

## Estructura de Archivos

```
src/
├── context/
│   └── ProjectContext.js       # Contexto global con todas las funciones CRUD
├── screens/
│   ├── CreateWorldScreen.js    # Creación de mundos
│   ├── WorldDetailScreen.js    # Vista detallada del mundo
│   ├── CreateBestiaryScreen.js # Creación de criaturas
│   ├── CreateCharacterScreen.js # Creación de personajes
│   ├── CreateFaunaScreen.js    # Creación de fauna nativa
│   └── CreateTimelineScreen.js # Creación de eventos temporales
└── App.js                      # Configuración de navegación
```

## Funcionalidades

### 1. Creación de Mundos (`CreateWorldScreen`)
- Nombre del mundo
- Tipo de mundo (Fantasy, Sci-Fi, etc.)
- Historia general
- Descripción adicional
- Vinculación a proyecto padre

### 2. Bestiario (`CreateBestiaryScreen`)
- Nombre de la criatura
- Imagen (URL)
- Características físicas
- Fauna/hábitat
- Cadena alimenticia
- Tipo de entidad (Animal, Mythical, Demon, etc.)
- Alimentación (Carnivore, Herbivore, etc.)
- Folclore y leyendas
- Descripción general

### 3. Personajes (`CreateCharacterScreen`)
- Nombre del personaje
- Imagen (URL)
- Edad y ocupación
- Características físicas
- Origen y cultura
- Pasado e historia
- Características psicológicas
- Trasfondo completo
- Lugares vinculados
- Criaturas vinculadas (bestiario)

### 4. Fauna Nativa (`CreateFaunaScreen`)
- Nombre de la especie
- Imagen (URL)
- Características
- Hábitat
- Tipo (Plant, Animal, Fungus, etc.)
- Usos y propiedades
- Nivel de peligro
- Descripción general

### 5. Línea de Tiempo (`CreateTimelineScreen`)
- Nombre del evento
- Fecha/año
- Era/período
- Nivel de importancia
- Descripción del evento
- Historias vinculadas
- Personajes vinculados
- Criaturas vinculadas

## Flujo de Navegación

```
ProjectList → CreateProject → CreateWorld → WorldDetail
                                           ↓
                    ┌─────────────────────┼─────────────────────┐
                    ↓                     ↓                     ↓
            CreateBestiary        CreateCharacter        CreateFauna
                    ↓                     ↓                     ↓
            CreateTimeline ←─────────────────────────────────────┘
```

## Uso del Contexto

Todas las operaciones se realizan a través del `ProjectContext`:

```javascript
import { useProjects } from '../context/ProjectContext';

const { 
  // Mundos
  createWorld,
  updateWorld,
  deleteWorld,
  getWorldById,
  getWorldsByProjectId,
  
  // Bestiario
  createBestiary,
  getBestiariesByWorldId,
  
  // Personajes
  createCharacter,
  getCharactersByWorldId,
  
  // Fauna
  createFauna,
  getFaunaByWorldId,
  
  // Línea de tiempo
  createTimeline,
  getTimelinesByWorldId,
} = useProjects();
```

## Estructura de Datos

### Mundo (World)
```javascript
{
  id: string,
  projectId: string,
  name: string,
  worldType: string,
  generalHistory: string,
  description: string,
  status: 'active',
  createdAt: string,
  updatedAt: string
}
```

### Bestiario
```javascript
{
  id: string,
  worldId: string,
  name: string,
  imageUrl: string,
  characteristics: string,
  fauna: string,
  foodChain: string,
  entityType: string,
  feeding: string,
  folklore: string,
  description: string,
  createdAt: string,
  updatedAt: string
}
```

### Personaje
```javascript
{
  id: string,
  worldId: string,
  name: string,
  imageUrl: string,
  physicalCharacteristics: string,
  origin: string,
  past: string,
  psychologicalCharacteristics: string,
  background: string,
  linkedLocations: string,
  linkedBestiary: string,
  age: string,
  occupation: string,
  createdAt: string,
  updatedAt: string
}
```

### Fauna Nativa
```javascript
{
  id: string,
  worldId: string,
  name: string,
  imageUrl: string,
  characteristics: string,
  habitat: string,
  type: string,
  description: string,
  uses: string,
  dangerLevel: string,
  createdAt: string,
  updatedAt: string
}
```

### Línea de Tiempo
```javascript
{
  id: string,
  worldId: string,
  name: string,
  date: string,
  description: string,
  linkedStory: string,
  linkedCharacter: string,
  linkedCreature: string,
  era: string,
  importance: string,
  createdAt: string,
  updatedAt: string
}
```

## Temas de Color por Módulo

- **Mundos**: `#7c4dff` (Púrpura)
- **Bestiario**: `#ff6b6b` (Rojo)
- **Personajes**: `#4ecdc4` (Turquesa)
- **Fauna**: `#96ceb4` (Verde)
- **Línea de Tiempo**: `#ffd93d` (Amarillo)

## Próximas Mejoras Sugeridas

1. **Subida de imágenes real**: Implementar `expo-image-picker` para cargar imágenes desde el dispositivo
2. **Búsqueda y filtrado**: Añadir capacidades de búsqueda en listas
3. **Exportación**: Permitir exportar mundos completos en formatos como JSON o PDF
4. **Relaciones visuales**: Diagramas de relaciones entre personajes y lugares
5. **Mapas interactivos**: Integración con mapas para ubicar lugares
6. **Persistencia**: Guardar datos en AsyncStorage o base de datos local
7. **Modo colaboración**: Compartir mundos con otros usuarios
