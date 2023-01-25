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
  const [allObjectives, setAllObjectives] = useState([
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
    {
      pokemon: 'samurott',
      found: false,
    },
    {
      pokemon: 'drifblim',
      found: false,
    },
    {
      pokemon: 'ferrothorn',
      found: false,
    },
    {
      pokemon: 'audino',
      found: false,
    },
    {
      pokemon: 'gigalith',
      found: false,
    },
    {
      pokemon: 'vulpix',
      found: false,
    },
    {
      pokemon: 'machop',
      found: false,
    },
    {
      pokemon: 'emboar',
      found: false,
    },
    {
      pokemon: 'flygon',
      found: false,
    },
    {
      pokemon: 'lopunny',
      found: false,
    },
    {
      pokemon: 'zoroark',
      found: false,
    },
    {
      pokemon: 'lucario',
      found: false,
    },
  ]);
  const [objectives, setObjectives] = useState();

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

  const randomizeObjectives = () => {
    const all = [...allObjectives];
    const current = [];
    for(let i = 0; i < allObjectives.length - 3; i++){
      const ran = Math.floor(Math.random() * (allObjectives.length - i));
      current.push(all[ran]);
      all.splice(ran, 1);
    }
    console.log(current);
    setObjectives(current);
    console.log(objectives)
  }

  useEffect(() => {
    randomizeObjectives();
    receiveScore();
    console.log(objectives);
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
    if(completeGame()) toggleHighscores();
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

  const resetGame = () => {
    if(!completeGame()) return;
    const characters = [...objectives];
    characters.forEach(character => {
      character.found = false;
    });
    setObjectives(characters);
    setTimeTaken(0);
    randomizeObjectives();
    receiveScore();
    toggleHighscores();
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
          resetGame={resetGame}
        />
      }
    </Container>
  );
}

export { db };
export default App;
