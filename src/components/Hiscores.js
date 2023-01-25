import { useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../App';
import styled from "styled-components";
import TopScores from './TopScores';
import { Button } from './Header';

const Popup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 500px;
    background-color: #111827ff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px black;
`

const Underlay = styled.div`
position: absolute;
    top: 0;
    left: 0;
    background-color: #11182793;
    height: 100vh;
    width: 100vw;
`

const Heading = styled.h2`
    margin: 1rem;
    font-size: 40px;
`

const Input = styled.input`
    align-self: center;
    width: 87%;
    margin-top: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #1f2937;
    border:  none;
    border-radius: 5px;
    box-shadow: 0px 0px 1px 1px goldenrod;
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 2.5rem;
    align-self: flex-end;
    margin: 1rem 2rem;
`

const Highscores = ( {timeTaken,
    parseTime, 
    allHighscores, 
    toggleHighscores, 
    completeGame,
    } ) => {
    const nameInput = useRef();

    const submitScore = async () => {
        if(!nameInput.current.value || !completeGame()) return;
        try {
            const docRef = await addDoc(collection(db, "scores"), {
                name: nameInput.current.value,
                timeTaken: timeTaken,
            });
            console.log("Added score to database", docRef.id);
        } catch(e) {
            console.error('Could not add score', e);
        }
    }

    return(
        <>
            <Underlay onClick={toggleHighscores} />
            <Popup>
                <Heading>Highscores</Heading>
                <hr />
                <TopScores 
                    allHighscores={allHighscores} 
                    parseTime={parseTime}
                />
                <label htmlFor="name">Enter Name To Submit Score*</label>
                <Input 
                    id="name" 
                    type="text" 
                    ref={nameInput}
                    placeholder="Enter Name"
                    maxLength="20" 
                />
                <ButtonGroup>
                    <Button onClick={submitScore}>
                        Submit
                    </Button>
                    <Button onClick={toggleHighscores}>
                        Close
                    </Button>
                </ButtonGroup>
            </Popup>
        </>
    )
}

export default Highscores;
