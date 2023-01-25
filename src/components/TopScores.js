import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Ol = styled.ol`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
`

const Li = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem;
`

const TopScores = ( {allHighscores, parseTime} ) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const receive = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(receive);
    }, []);

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
            {loading ? undefined : scoreMap()}
        </Ol>
    )
}

export default TopScores;
