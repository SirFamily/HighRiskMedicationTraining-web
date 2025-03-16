import React, { createContext, useState, useContext } from 'react';

const NameContext = createContext();

export const NameProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [scores, setScores] = useState({
    preTest: 0,
    simulationGame: 0,
    matchingGame: 0,
    spellingGame: 0,
    postTest: 0
  });

  const updateName = (newFirstName, newLastName) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
  };

  const updateScore = (key, score) => {
    setScores((prevScores) => ({ ...prevScores, [key]: score }));
    console.log(scores);
  };

  return (
    <NameContext.Provider value={{ firstName, lastName, scores, updateName, updateScore }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => useContext(NameContext);
