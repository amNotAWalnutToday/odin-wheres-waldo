import styled from 'styled-components';
import theImage from '../imgs/pokemon-image.jpg';

const Image = styled.img`
    z-index: 1;
    width: 80%;
    margin: 1rem 0;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #111827;
`;

const GameImage = () => {
    return (
        <Image src={theImage} alt="game image" />
    );
}

export default GameImage;
