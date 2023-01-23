import styled from "styled-components";

const Li = styled.li`
    font-size: 20px;
    list-style: none;
    transform: translateY(-25%);
    user-select: none;
`

const ThingsToFind = () => {
    return (
        <>
            <Li className="heatran">Heatran</Li>
            <Li className="rayquaza" >Rayquaza</Li>
            <Li className="wailord" >Wailord</Li>
        </>
    );
}

export default ThingsToFind;