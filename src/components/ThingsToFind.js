import styled from "styled-components";

const Li = styled.li`
    font-size: 20px;
    list-style: none;
    transform: translateY(-25%);
    user-select: none;
    text-decoration: ${props => props.found ? "line-through" : ""};
    opacity: ${props => props.found ? "50%" : ""};
`

const ThingsToFind = ( {objectives, validateImage, fromDropdown} ) => {
    const checkFoundPokemon = (pokemon) => {
        let found;
        objectives.forEach(objective => {
            if(objective.pokemon === pokemon && objective.found) found = true;
        });
        return found;
    }

    return (
        <>
            <Li 
                className="heatran" 
                onClick={fromDropdown 
                    ? () => validateImage("heatran") 
                    : undefined
                }
                found={checkFoundPokemon("heatran")}
            >
                Heatran
            </Li>
            <Li 
                className="rayquaza" 
                onClick={fromDropdown
                    ? () => validateImage("rayquaza")
                    : undefined
                }
                found={checkFoundPokemon("rayquaza")}
            >
                Rayquaza
            </Li>
            <Li 
                className="wailord"
                onClick={fromDropdown
                    ? () => validateImage("wailord")
                    : undefined
                }
                found={checkFoundPokemon("wailord")}
            >
                Wailord
            </Li>
        </>
    );
}

export default ThingsToFind;