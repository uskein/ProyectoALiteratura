# ALiteratura - Módulo de Creación de Proyectos

## Descripción del Módulo

Este módulo permite a los usuarios crear y gestionar proyectos literarios dentro de la aplicación ALiteratura. Incluye funcionalidades para:

- **Crear nuevos proyectos** con nombre, autor, género y descripción
- **Listar todos los proyectos** creados
- **Gestionar el estado** de los proyectos mediante Context API

## Estructura del Módulo

```
Aliteratura/
├── src/
│   ├── context/
│   │   └── ProjectContext.js       # Gestión del estado global de proyectos
│   ├── screens/
│   │   ├── CreateProjectScreen.js  # Pantalla para crear nuevos proyectos
│   │   └── ProjectListScreen.js    # Pantalla para listar proyectos existentes
│   ├── components/                  # Componentes reutilizables (futuro)
│   └── utils/                       # Utilidades y helpers (futuro)
├── App.js                           # Componente principal con navegación
├── app.json                         # Configuración de Expo
├── package.json                     # Dependencias del proyecto
└── index.js                         # Punto de entrada
```

## Características Implementadas

### 1. ProjectContext
- Estado global para gestionar todos los proyectos
- Funciones CRUD: `createProject`, `updateProject`, `deleteProject`, `getProjectById`
- Hook personalizado `useProjects()` para acceder al contexto

### 2. Pantalla de Creación de Proyectos
- Formulario con campos:
  - Nombre del proyecto (requerido)
  - Autor
  - Género literario (selección múltiple)
  - Tipo de mundo (selección múltiple)
  - Descripción (texto multilinea)
- Validación de campos requeridos
- Confirmación visual al crear proyecto

### 3. Pantalla de Lista de Proyectos
- Visualización de todos los proyectos en tarjetas
- Estado vacío con llamado a la acción
- Navegación a detalles del proyecto (pendiente)
- Botón para crear nuevo proyecto

## Dependencias Requeridas

```json
{
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/stack": "^6.4.1",
  "react-native-safe-area-context": "^4.12.0",
  "react-native-screens": "^3.35.0"
}
```

## Instalación

1. Asegúrate de tener Node.js instalado
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```

## Uso

1. Al iniciar la app, verás la lista de proyectos (vacía inicialmente)
2. Presiona "+ Nuevo" o "Crear Primer Proyecto"
3. Completa el formulario con la información de tu proyecto literario
4. Presiona "Crear Proyecto"
5. El proyecto aparecerá en la lista principal

## Próximas Mejoras

- [ ] Persistencia de datos (AsyncStorage o base de datos)
- [ ] Pantalla de detalles del proyecto
- [ ] Edición de proyectos existentes
- [ ] Eliminación de proyectos con confirmación
- [ ] Búsqueda y filtrado de proyectos
- [ ] Exportación/importación de proyectos
- [ ] Soporte para elementos del mundo literario (personajes, lugares, etc.)

## Tecnologías Utilizadas

- **React Native**: Framework para aplicaciones móviles
- **Expo**: Plataforma de desarrollo React Native
- **React Navigation**: Navegación entre pantallas
- **Context API**: Gestión de estado global
- **Hooks**: useState, useContext, useEffect
