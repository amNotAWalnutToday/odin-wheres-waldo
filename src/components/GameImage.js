import { useState } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import theImage from '../imgs/pokemon-image.jpg';

const Image = styled.img`
    z-index: -1;
    width: 100%;
    margin: 1rem 0;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #111827;
`;

const GameImage = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [clickPosition, setClickPosition] = useState({x: 0, y:0});

    const toggleMenu = (e) => {
        console.log('x', e.nativeEvent.pageX, 'y',  e.nativeEvent.pageY);
        setClickPosition({
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY,
        });
        setShowMenu(!showMenu);
    }


    return (
        <div onClick={toggleMenu}>
            <Image src={theImage} alt="game image" />
            {showMenu && <Dropdown clickPosition={clickPosition} />}
        </div>
    );
}

export default GameImage;
