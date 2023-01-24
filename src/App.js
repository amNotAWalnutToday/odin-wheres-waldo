import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import getFirebaseConfig from './firebase.config';
import { getFirestore } from 'firebase/firestore';
import styled from 'styled-components';
import Header from './components/Header';
import GameImage from './components/GameImage';
import Highscores from './components/Hiscores';

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const App = () => {
  const [showHighscores, setShowHighscores] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [objectives, setObjectives] = useState([
    {
      pokemon: 'heatran',
      found: false,
    },
    {
      pokemon: 'rayquaza',
      found: false,
    },
    {
      pokemon: 'wailord',
      found: false,
    },
  ]);

  const toggleHighscores = () => {
    setShowHighscores(!showHighscores);
  }

  const incrementTimer = () => {
    if(completeGame()) return;
    setTimeTaken(timeTaken => timeTaken + 1);
  }

  const findCharacter = (pokemon) => {
    const characters = [...objectives];
    characters.forEach(character => {
      if(character.pokemon === pokemon) character.found = true;
    });
    setObjectives(characters);
  }

  const completeGame = () => {
    const characters = [...objectives];
    const winConditions = [];
    characters.forEach(character => {
      if(character.found) winConditions.push(character);
    });
    if(winConditions.length === 3) return true;
    else return false;
  }

  return (
    <Container>
      <Header 
        objectives={objectives} 
        toggleHighscores={toggleHighscores}
        timeTaken={timeTaken}
        incrementTimer={incrementTimer} 
      />
      <GameImage 
        objectives={objectives} 
        findCharacter={findCharacter} 
      />
      {showHighscores && <Highscores timeTaken={timeTaken} />}
    </Container>
  );
}

export { db };
export default App;
