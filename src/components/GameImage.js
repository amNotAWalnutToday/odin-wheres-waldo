import { useState, useRef, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../App';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import TargetBox from './TargetBox';
import theImage from '../imgs/pokemon-image.jpg';

const Image = styled.img`
    z-index: -1;
    width: 1024px;
    height: 576px;
    margin: 1rem 0;
    user-select: none;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #111827;
`;

/* this is for testing */
const Box = styled.div`
    display: none;
    position: absolute;
    top: calc(${props => props.pos.y}px + 460px);
    left: calc(${props => props.pos.x}px + 0px);
    width: 62px;
    height: 115px;
    outline: 2px solid pink;
`

const GameImage = ( {objectives, findCharacter} ) => {
    const [showMenu, setShowMenu] = useState(false);
    const [clickPosition, setClickPosition] = useState({x: 0, y: 0});
    const [imagePosition, setImagePosition] = useState({x: 0, y: 0});
    const imageRef = useRef();

    const toggleMenu = (e) => {
        setClickPosition({
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY,
        });
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        window.addEventListener('resize', getImagePos);
        getImagePos();
        return () => window.removeEventListener('resize', getImagePos);
    }, []);

    const getImagePos = () => {
        setImagePosition({
            x: imageRef.current.offsetLeft,
            y: imageRef.current.offsetTop,
        })
    }

    const validateImage = async (pokemon) => {
        const mouseX = clickPosition.x - imagePosition.x;
        const mouseY = clickPosition.y - imagePosition.y;
        const validateLocationQuery = query(
            collection(db, pokemon),
            where("posX", "<=", mouseX),
        );
        let validatedPokemon;
        const querySnapshot = await getDocs(validateLocationQuery);
        querySnapshot.forEach(query => {
            if(mouseY <= (query.data().posY)
            || mouseX >= (query.data().width + query.data().posX) 
            || mouseY >= (query.data().height + query.data().posY)
            ) return;
            else {
                validatedPokemon = query.data();
                findCharacter(pokemon);
            }
        });
        console.log(objectives)
        return validatedPokemon;
    }

    return (
        <div onClick={toggleMenu}>
            <Image 
                src={theImage} 
                alt="game image" 
                draggable={false} 
                ref={imageRef} 
            />
            <Box pos={imagePosition} />
            {showMenu 
                && <Dropdown 
                    clickPosition={clickPosition} 
                    validateImage={validateImage} 
                    objectives={objectives}
                />
            }
            {showMenu && <TargetBox clickPosition={clickPosition}/>}
        </div>
    );
}

export default GameImage;
