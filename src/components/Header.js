import styled from "styled-components";
import ThingsToFind from "./ThingsToFind";
import Timer from './Timer';

const Heading = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1.5rem 1rem;
    background-color: #111827;
    box-shadow: 0px 0px 5px 1px #111827;
`;

const Title = styled.h1`
    font-size: 46px;
`;

const Ul = styled.ul`
    display: flex;
    gap: 2rem;
`

const Button = styled.button`
    padding: 1rem;
    font-size: 20px;
    background-color: #1f2937;
    border-radius: 5px;
    border: none;
    transition: background-color 0.2s ease-out;
`

const Header = ( {objectives, 
        toggleHighscores, 
        timeTaken, 
        incrementTimer,
        parseTime,
    } ) => {
    return (
        <Heading>
            <Title>Find That Pokemon</Title>
            <Ul>
                <ThingsToFind objectives={objectives} />
                <Timer 
                    timeTaken={timeTaken}
                    incrementTimer={incrementTimer}
                    parseTime={parseTime}
                />
            </Ul>
            <Button onClick={toggleHighscores}>HighScores</Button>
        </Heading>
    );
}

export default Header 
