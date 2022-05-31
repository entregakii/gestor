import React from 'react';
import {colors} from '../config';
import styled from 'styled-components';
import Icon from './Icon';
import Heading from './Heading';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from './Button';



export const Container = styled.button`
    background-color: ${colors.background};
    overflow-y: auto;
    width: 100%;
    height: 100%;

    li{
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      border-radius: 8px;
      cursor: pointer;

      &:hover{
        background-color: ${colors.gray100};
      }
    }
`;


const Menu = ({context}:any) => {

  return <Container >
  
        {context.map((li:any) => (
            <li onClick={li.onClick} key={li.title}>
                <Icon name={li.icon} size={18} color={colors.gray700}/>
                <div style={{width: 12}}/>
                <Heading size={5} title={li.title}/>
            </li>
        ))}
    
    </Container>
}

export default Menu