import styled from 'styled-components';
import Header from './components/Header';
import GameImage from './components/GameImage';

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
