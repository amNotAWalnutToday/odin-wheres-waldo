import { useEffect, useState } from "react";
import styled from "styled-components";

const Li = styled.li`
    font-size: 20px;
    list-style: none;
    text-transform: capitalize;
    padding: ${props => props.fromDropdown ? "0rem 2rem 2rem 2rem" : "0 1rem"};
    transform: translateY(-25%);
    user-select: none;
    text-decoration: ${props => props.found ? "line-through" : ""};
    opacity: ${props => props.found ? "50%" : ""};
    transition: background-color 0.2s ease-out;
`

const ThingsToFind = ( {objectives, validateImage, fromDropdown} ) => {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState();
    useEffect(() => {
        bindPokemon();
        /* eslint-disable-next-line */
    }, [objectives]);

    useEffect(() => {
        setLoading(false);
    }, [pokemon]);

    const bindPokemon = () => {
        const pokemonList = [];
        objectives.forEach(objective => {
            pokemonList.push(objective.pokemon);
        })
        setPokemon(pokemonList);
    }

    const checkFoundPokemon = (pokemon) => {
        let found;
        objectives.forEach(objective => {
            if(objective.pokemon === pokemon && objective.found) found = true;
        });
        return found;
    }

    return (
        <>
            {!loading 
            && <Li 
                className={fromDropdown 
                    ? `${pokemon[0]} menu-item` 
                    : `${pokemon[0]}`
                }
                onClick={fromDropdown 
                    ? () => validateImage(pokemon[0]) 
                    : undefined
                }
                found={checkFoundPokemon(pokemon[0])}
                fromDropdown={fromDropdown}
            >
                {pokemon[0]}    
            </Li>}
            {!loading 
            && <Li 
                className={fromDropdown 
                    ? `${pokemon[1]} menu-item`
                    : `${pokemon[1]}`
                }
                onClick={fromDropdown
                    ? () => validateImage(pokemon[1])
                    : undefined
                }
                found={checkFoundPokemon(pokemon[1])}
                fromDropdown={fromDropdown}
            >
                {pokemon[1]}
            </Li>}
            {!loading 
            && <Li 
                className={fromDropdown 
                    ? `${pokemon[2]} menu-item` 
                    : `${pokemon[2]}`
                }
                onClick={fromDropdown
                    ? () => validateImage(pokemon[2])
                    : undefined
                }
                found={checkFoundPokemon(pokemon[2])}
                fromDropdown={fromDropdown}
            >
                {pokemon[2]}
            </Li>}
        </>
    );
}

export default ThingsToFind;
export { Li };