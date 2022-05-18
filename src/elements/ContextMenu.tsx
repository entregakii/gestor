import React from 'react';
import {colors} from '../config';
import styled from 'styled-components';
import Icon from './Icon';
import Heading from './Heading';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from './Button';



export const Container = styled.button`

  position: relative;
  


    .button {
   border-radius: 8px;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
    
   
    padding: 0px 30px;
    height: 36px;

   
    font-family: Whitney Bold;
    outline: none;
    color: ${colors.background};
  
    transition: 200ms;

    &:hover{
      opacity: 0.7;
    }
  }

  .context {
    background-color: ${colors.background};
    box-shadow: 0px 0px 5px #0002;
    border-radius: 10px;
    overflow: hidden;
    min-width: 150px;
    position: absolute;
    z-index: 10000;
    top: 100%;
    right: 0;

    li{
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 16px;

      &:hover{
        background-color: ${colors.gray100};
      }
    }
  }

`;


const ContextMenu = ({context,title,onClick,flex,disabled,icon,margin = 10,variant = "link",color = colors.primary,submit}:any) => {

  const variants:any = {
    contained: {
        backgroundColor: color,
    },
    link: {
       color,
    }
  }

  const [show,setShow] = useState(false);

  const handleClickOut = () => {
    setShow(false)
    document.removeEventListener('click',handleClickOut);
  }

  const toggle = () => {
      setShow(true)
  }

  useEffect(() => {
      if(show)
        document.addEventListener('click',handleClickOut);
  },[show])

  return <Container disabled={disabled} type={submit ? "submit" : "button"} style={{margin: `${margin}px 0`,flex: flex ? 1 : undefined,...variants[variant],width: flex ? "100%" : 'auto',opacity: disabled ? 0.5 : 1,cursor: disabled ? "progress" : "pointer"}} onClick={onClick}>
   
      <Button icon={icon} variant="linkRounded" iconSize={24} onClick={!show ? toggle : () => {}}/>

      {show && <div className='context'>
          {context.map((li:any) => (
             <li onClick={li.onClick} key={li.title}><Heading size={6} title={li.title}/></li>
          ))}

      </div> }
    
    </Container>
}

export default ContextMenu