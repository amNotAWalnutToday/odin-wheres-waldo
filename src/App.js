import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import getFirebaseConfig from './firebase.config';
import { getFirestore } from 'firebase/firestore';
import styled from 'styled-components';
import Header from './components/Header';
import GameImage from './components/GameImage';


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

  const findCharacter = (pokemon) => {
    const characters = [...objectives];
    characters.forEach(character => {
      if(character.pokemon === pokemon) character.found = true;
    });
    setObjectives(characters);
  }

  return (
    <Container>
      <Header objectives={objectives} />
      <GameImage objectives={objectives} findCharacter={findCharacter} />
    </Container>
  );
}

export { db };
export default App;
