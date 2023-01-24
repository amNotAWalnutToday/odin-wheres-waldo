import styled from "styled-components";

/* obsolete will be removed */
const Target = styled.div`
    position: absolute;
    top: calc(${props => props.clickPosition.y}px - 25px);
    left: calc(${props => props.clickPosition.x}px - 25px);
    width: 50px;
    height: 50px;
    outline: 2px dashed white;
`

const TargetBox = ( {clickPosition} ) => {
    return(
        <Target clickPosition={clickPosition} />
    );
}

export default TargetBox;
