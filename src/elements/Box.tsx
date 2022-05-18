import React from 'react';
import styled from 'styled-components';
import { colors } from '../config';

const Container = styled.div`
   
    border: 1px solid ${colors.gray200};
    padding: 16px;
    border-radius: 8px;
    min-height: 50px;

`;

const Box = ({column,columnType="px",gap,children,height = '100%',width = '100%',style}:any) => {
  return <Container style={{width,height,...style}}>
      {children}
  </Container>;
}

export default Box;