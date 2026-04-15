import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [worlds, setWorlds] = useState([]);
  const [bestiaries, setBestiaries] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [fauna, setFauna] = useState([]);
  const [timelines, setTimelines] = useState([]);

  // Project functions
  const createProject = (projectData) => {
    const newProject = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...projectData,
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  // World functions
  const createWorld = (worldData) => {
    const newWorld = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...worldData,
    };
    setWorlds((prev) => [...prev, newWorld]);
    return newWorld;
  };

  const updateWorld = (id, updates) => {
    setWorlds((prev) =>
      prev.map((world) =>
        world.id === id
          ? { ...world, ...updates, updatedAt: new Date().toISOString() }
          : world
      )
    );
  };

  const deleteWorld = (id) => {
    setWorlds((prev) => prev.filter((world) => world.id !== id));
  };

  const getWorldById = (id) => {
    return worlds.find((world) => world.id === id);
  };

  const getWorldsByProjectId = (projectId) => {
    return worlds.filter((world) => world.projectId === projectId);
  };

  // Bestiary functions
  const createBestiary = (bestiaryData) => {
    const newBestiary = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...bestiaryData,
    };
    setBestiaries((prev) => [...prev, newBestiary]);
    return newBestiary;
  };

  const updateBestiary = (id, updates) => {
    setBestiaries((prev) =>
      prev.map((bestiary) =>
        bestiary.id === id
          ? { ...bestiary, ...updates, updatedAt: new Date().toISOString() }
          : bestiary
      )
    );
  };

  const deleteBestiary = (id) => {
    setBestiaries((prev) => prev.filter((bestiary) => bestiary.id !== id));
  };

  const getBestiaryById = (id) => {
    return bestiaries.find((bestiary) => bestiary.id === id);
  };

  const getBestiariesByWorldId = (worldId) => {
    return bestiaries.filter((bestiary) => bestiary.worldId === worldId);
  };

  // Character functions
  const createCharacter = (characterData) => {
    const newCharacter = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...characterData,
    };
    setCharacters((prev) => [...prev, newCharacter]);
    return newCharacter;
  };

  const updateCharacter = (id, updates) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id
          ? { ...character, ...updates, updatedAt: new Date().toISOString() }
          : character
      )
    );
  };

  const deleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((character) => character.id !== id));
  };

  const getCharacterById = (id) => {
    return characters.find((character) => character.id === id);
  };

  const getCharactersByWorldId = (worldId) => {
    return characters.filter((character) => character.worldId === worldId);
  };

  // Fauna functions
  const createFauna = (faunaData) => {
    const newFauna = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...faunaData,
    };
    setFauna((prev) => [...prev, newFauna]);
    return newFauna;
  };

  const updateFauna = (id, updates) => {
    setFauna((prev) =>
      prev.map((faunaItem) =>
        faunaItem.id === id
          ? { ...faunaItem, ...updates, updatedAt: new Date().toISOString() }
          : faunaItem
      )
    );
  };

  const deleteFauna = (id) => {
    setFauna((prev) => prev.filter((faunaItem) => faunaItem.id !== id));
  };

  const getFaunaById = (id) => {
    return fauna.find((faunaItem) => faunaItem.id === id);
  };

  const getFaunaByWorldId = (worldId) => {
    return fauna.filter((faunaItem) => faunaItem.worldId === worldId);
  };

  // Timeline functions
  const createTimeline = (timelineData) => {
    const newTimeline = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...timelineData,
    };
    setTimelines((prev) => [...prev, newTimeline]);
    return newTimeline;
  };

  const updateTimeline = (id, updates) => {
    setTimelines((prev) =>
      prev.map((timeline) =>
        timeline.id === id
          ? { ...timeline, ...updates, updatedAt: new Date().toISOString() }
          : timeline
      )
    );
  };

  const deleteTimeline = (id) => {
    setTimelines((prev) => prev.filter((timeline) => timeline.id !== id));
  };

  const getTimelineById = (id) => {
    return timelines.find((timeline) => timeline.id === id);
  };

  const getTimelinesByWorldId = (worldId) => {
    return timelines.filter((timeline) => timeline.worldId === worldId);
  };

  const value = {
    // Projects
    projects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    // Worlds
    worlds,
    createWorld,
    updateWorld,
    deleteWorld,
    getWorldById,
    getWorldsByProjectId,
    // Bestiaries
    bestiaries,
    createBestiary,
    updateBestiary,
    deleteBestiary,
    getBestiaryById,
    getBestiariesByWorldId,
    // Characters
    characters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterById,
    getCharactersByWorldId,
    // Fauna
    fauna,
    createFauna,
    updateFauna,
    deleteFauna,
    getFaunaById,
    getFaunaByWorldId,
    // Timelines
    timelines,
    createTimeline,
    updateTimeline,
    deleteTimeline,
    getTimelineById,
    getTimelinesByWorldId,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
