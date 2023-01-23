import styled from 'styled-components';
import Header from './components/Header';
import GameImage from './components/GameImage';
import { initializeApp } from 'firebase/app';
import getFirebaseConfig from './firebase.config';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

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
  return (
    <Container>
      <Header />
      <GameImage />
    </Container>
  );
}

export default App;

/*validation

if(pointer.y >= posY && pointer.y <= (posY + height))
if(pointer.x >= posX && pointer.x <= (posX + width))
*/
