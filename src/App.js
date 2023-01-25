import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import getFirebaseConfig from './firebase.config';
import { getFirestore, query, getDocs, collection, orderBy, limit } from 'firebase/firestore';
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
  const [allHighscores, setAllHighscores] = useState();
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

  const receiveScore = () => {
    async function result() {
      const topTen = [];
      const scoreQuery = query(
        collection(db, "scores"), 
        orderBy("timeTaken"), 
        limit(10)
      );
      const querySnapshot = await getDocs(scoreQuery);
      querySnapshot.forEach(score => {
          topTen.push(score.data());
          setAllHighscores(topTen)
      });
      return topTen;
    }
    console.log(allHighscores);
    return result();
    
  }

  useEffect(() => {
    receiveScore()
    /* eslint-disable-next-line */
  }, []);

  const toggleHighscores = () => {
    setShowHighscores(!showHighscores);
  }

  const incrementTimer = () => {
    if(completeGame()) return;
    setTimeTaken(timeTaken => timeTaken + 1);
  }

  const parseTime = (timeInSeconds) => {
    let secondPrefix = '';
    let minutePrefix = '';
    let seconds;
    const minutes = Math.floor(timeInSeconds / 60);
    if(minutes > 0) seconds = timeInSeconds - (minutes * 60); 
    else seconds = timeInSeconds;
    if(minutes < 10) minutePrefix = '0';
    if(seconds < 10) secondPrefix = '0';
    return `${minutePrefix}${minutes}m ${secondPrefix}${seconds}s`
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
        parseTime={parseTime}
      />
      <GameImage 
        objectives={objectives} 
        findCharacter={findCharacter} 
      />
      {showHighscores 
      && <Highscores 
          allHighscores={allHighscores} 
          timeTaken={timeTaken} 
          parseTime={parseTime} 
          toggleHighscores={toggleHighscores}
          completeGame={completeGame}
        />
      }
    </Container>
  );
}

export { db };
export default App;
