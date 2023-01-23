import styled from "styled-components";
import heatranImage from '../imgs/heatran.png';
import rayquazaImage from '../imgs/rayquaza.png';
import wailordImage from '../imgs/wailord.png';

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
    transform: translateY(-25%);
`

const Li = styled.li`
    font-size: 20px;
    list-style: none;
`

const Button = styled.button`
    padding: 1rem;
    font-size: 20px;
    background-color: #1f2937;
    border-radius: 5px;
    border: none;
`

const Header = () => {
    return (
        <Heading>
            <Title>Find That Pokemon</Title>
            <Ul>
                <Li className="heatran">Heatran</Li>
                <Li className="rayquaza" >Rayquaza</Li>
                <Li className="wailord" >Wailord</Li>
            </Ul>
            <Button>HighScores</Button>
        </Heading>
    );
}

export default Header 
