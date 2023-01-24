import styled from "styled-components";

const Li = styled.li`
    font-size: 20px;
    list-style: none;
    padding: ${props => props.fromDropdown ? "0rem 2rem 2rem 2rem" : "0 1rem"};
    transform: translateY(-25%);
    user-select: none;
    text-decoration: ${props => props.found ? "line-through" : ""};
    opacity: ${props => props.found ? "50%" : ""};
    transition: background-color 0.2s ease-out;
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
                className={fromDropdown ? "heatran menu-item" : "heatran"}
                onClick={fromDropdown 
                    ? () => validateImage("heatran") 
                    : undefined
                }
                found={checkFoundPokemon("heatran")}
                fromDropdown={fromDropdown}
            >
                Heatran
            </Li>
            <Li 
                className={fromDropdown ? "rayquaza  menu-item" : "rayquaza"}
                onClick={fromDropdown
                    ? () => validateImage("rayquaza")
                    : undefined
                }
                found={checkFoundPokemon("rayquaza")}
                fromDropdown={fromDropdown}
            >
                Rayquaza
            </Li>
            <Li 
                className={fromDropdown ? "wailord menu-item" : "wailord"}
                onClick={fromDropdown
                    ? () => validateImage("wailord")
                    : undefined
                }
                found={checkFoundPokemon("wailord")}
                fromDropdown={fromDropdown}
            >
                Wailord
            </Li>
        </>
    );
}

export default ThingsToFind;
export { Li };