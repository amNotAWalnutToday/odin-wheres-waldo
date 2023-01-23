import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import TargetBox from './TargetBox';
import theImage from '../imgs/pokemon-image.jpg';

const Image = styled.img`
    z-index: -1;
    width: 1024px;
    height: 576px;
    margin: 1rem 0;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #111827;
`;

const Box = styled.div`
    position: absolute;
    top: calc(${props => props.pos.y}px + 0px);
    left: calc(${props => props.pos.x}px + 200px);
    width: 200px;
    height: 85px;
    outline: 2px solid pink;
`

const GameImage = () => {
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

    return (
        <div onClick={toggleMenu}>
            <Image src={theImage} alt="game image" ref={imageRef} />
            <Box pos={imagePosition} />
            {showMenu && <Dropdown clickPosition={clickPosition}/>}
            {showMenu && <TargetBox clickPosition={clickPosition}/>}
        </div>
    );
}

export default GameImage;
