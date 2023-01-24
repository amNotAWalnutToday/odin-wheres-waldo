import styled from 'styled-components';
import ThingsToFind from './ThingsToFind';

const Menu = styled.div`
    z-index: 5;
    position: absolute;
    top: calc(${props => props.clickPosition.y}px - 50px);
    left: calc(${props => props.clickPosition.x}px - 25px);
    padding: 1rem 2rem;
    background-color: #1f2937b9;
    border-radius: 5px;
`

const Dropdown = ( {objectives, clickPosition, validateImage} ) => {
    return(
        <Menu clickPosition={clickPosition} >
            <ThingsToFind 
                validateImage={validateImage} 
                fromDropdown="true" objectives={objectives}
            />
        </Menu>
    );
}

export default Dropdown;
