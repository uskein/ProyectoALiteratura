import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectProvider } from './src/context/ProjectContext';
import ProjectListScreen from './src/screens/ProjectListScreen';
import CreateProjectScreen from './src/screens/CreateProjectScreen';
import CreateWorldScreen from './src/screens/CreateWorldScreen';
import WorldDetailScreen from './src/screens/WorldDetailScreen';
import CreateBestiaryScreen from './src/screens/CreateBestiaryScreen';
import CreateCharacterScreen from './src/screens/CreateCharacterScreen';
import CreateFaunaScreen from './src/screens/CreateFaunaScreen';
import CreateTimelineScreen from './src/screens/CreateTimelineScreen';
import CreateInfrastructureScreen from './src/screens/CreateInfrastructureScreen';
import CreateGeologyScreen from './src/screens/CreateGeologyScreen';
import CreateMagicScreen from './src/screens/CreateMagicScreen';
import CreateReligionScreen from './src/screens/CreateReligionScreen';
import CreateChapterScreen from './src/screens/CreateChapterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProjectProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProjectList"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="ProjectList" component={ProjectListScreen} />
          <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
          <Stack.Screen name="CreateWorld" component={CreateWorldScreen} />
          <Stack.Screen name="WorldDetail" component={WorldDetailScreen} />
          <Stack.Screen name="CreateBestiary" component={CreateBestiaryScreen} />
          <Stack.Screen name="CreateCharacter" component={CreateCharacterScreen} />
          <Stack.Screen name="CreateFauna" component={CreateFaunaScreen} />
          <Stack.Screen name="CreateTimeline" component={CreateTimelineScreen} />
          <Stack.Screen name="CreateInfrastructure" component={CreateInfrastructureScreen} />
          <Stack.Screen name="CreateGeology" component={CreateGeologyScreen} />
          <Stack.Screen name="CreateMagic" component={CreateMagicScreen} />
          <Stack.Screen name="CreateReligion" component={CreateReligionScreen} />
          <Stack.Screen name="CreateChapter" component={CreateChapterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProjectProvider>
  );
}
