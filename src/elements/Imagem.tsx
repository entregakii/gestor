import React from 'react';
import { ReactChildren } from 'react';
import styled from 'styled-components';
import { colors } from '../config';

const Container = styled.div`
   
  

`;

type FlexProps = {
  src: string
  width?: any
  height?: number
  radius?: number
}

const Image = ({src,width= 100,height,radius=5}:FlexProps) => {
  return <Container >
     <img src={src} width={width || "auto"} height={height || "auto"} style={{borderRadius: radius}}/>
  </Container>;
}

export default Image;