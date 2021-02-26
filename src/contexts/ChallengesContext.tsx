import { createContext, useState, ReactNode } from 'react';

import challenges from '../../challenges.json';

interface Challange {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challange,
  experienceToNextLevel: number,
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallange: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(20);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallangeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallangeIndex]

    setActiveChallenge(challenge);
  }

  function resetChallange() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider 
    value={{ 
      level,
      currentExperience,
      challengesCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallange,
      experienceToNextLevel,
    }}
    > 
    {children}
    </ChallengesContext.Provider>
  );
}