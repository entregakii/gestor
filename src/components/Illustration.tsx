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
    flex: 1;

    img {
        width: 150px;
        height: 150px;
        margin: 20px;
    }
`;


const Illustration = ({src,title,description}:any) => {
  return <Container>
      <img src={src}/>
      <Heading size={4} align="center" title={title} bold/>
      <Heading size={6} align="center" color={colors.gray500} title={description} bold/>
  </Container>;
}

export default Illustration;