import { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs, addDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../App';
import styled from "styled-components";
import TopScores from './TopScores';


const Popup = styled.div`
    position: absolute;
    margin: 15%;
    width: 500px;
    height: 500px;
    background-color: #1f2937b9;
    border-radius: 5px;
`

const Highscores = ( {timeTaken, parseTime, allHighscores} ) => {
    const nameInput = useRef();

    const submitScore = async () => {
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
        <Popup>
            <h2>Highscores</h2>
            <hr />
            {<TopScores allHighscores={allHighscores} parseTime={parseTime}/>}
            <label htmlFor="name"></label>
            <input id="name" type="text" ref={nameInput} />
            <button onClick={submitScore} >Submit</button>
            <button>Close</button>
        </Popup>
    )
}

export default Highscores;
