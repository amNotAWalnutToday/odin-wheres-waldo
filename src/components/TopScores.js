import styled from "styled-components";
import React from "react";

const Ol = styled.ol`
    display: flex;
    flex-direction: column;
    gap: 0rem;
    padding: 0rem 2rem 1rem 2rem;
    margin-top: 0.1rem;
`

const Li = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    &:hover {
        background-color: rgba(218, 165, 32, 0.8);
    }
`

const TopScores = ( {allHighscores, parseTime} ) => {
    const scoreMap = () => {
        if(!allHighscores) return;
        return allHighscores.map((item, i) => {
            return (
                <React.Fragment key={i} >
                    <Li>
                        {i+1}. {item.name}
                        <span>
                            {parseTime(item.timeTaken)}
                        </span>
                    </Li>
                    <hr/>
                </React.Fragment>
            )
        });
    }
    return (
        <Ol>
            {scoreMap()}
        </Ol>
    )
}

export default TopScores;
