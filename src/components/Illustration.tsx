import React from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import Heading from '../elements/Heading';

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
        width: 200px;
        height: 200px;
        margin: 20px;
    }
`;


const Illustration = ({src,title,description}:any) => {
  return <Container>
      <img src={src}/>
      <Heading size={2} title={title} bold/>
      <Heading size={4} color={colors.gray500} title={description} bold/>
  </Container>;
}

export default Illustration;