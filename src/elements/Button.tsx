import React from 'react';
import {colors} from '../config';
import styled from 'styled-components';
import Icon from './Icon';
import Heading from './Heading';


const getContrast = (hex: string) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if(!result)
      return;

  let rgb = [
      parseInt(result[1], 16),parseInt(result[2], 16), parseInt(result[3], 16)
  ]
   
  if ((rgb[0] * 0.299) + (rgb[1] * 0.587) + (rgb[2] * 0.114) > 186) {
      return '#000000';
  } else {
      return '#ffffff';
  }
  
}

export const Container = styled.button`

   position: relative;
  
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
      background-color: ${(props:any) => props["attr-background-hover"]};
    }

`;


const Button = ({title,onClick,flex,disabled,icon,iconSize = 24,margin = 0,variant = "link",color = colors.primary_color,submit}:any) => {

  const variants:any = {
    contained: {
        backgroundColor: color,
        color: getContrast(color),
    },
    outline: {
        border: `1px solid ${color}`,
        color,
    },
    rounded: {
      backgroundColor: color,
      color: getContrast(color),
      borderRadius: 50
    },
     linkRounded: {
      color,
      borderRadius: 50
    },
    outlineRounded: {
      border: `1px solid ${color}`,
      color: getContrast(color),
      borderRadius: 50
    },
    link: {
       color,
    }
  }

  return <Container attr-background-hover={`${variants[variant].color}0f`} disabled={disabled} type={submit ? "submit" : "button"} 
  style={{margin: `${margin}px 0`,
  borderRadius: 8,
  padding: title ? "0 30px" : 0
  ,flex: flex ? 1 : undefined,
  height: iconSize+12,
  width: flex ? '100%' : title ? 'auto' : iconSize+12,
  ...variants[variant],opacity: disabled ? 0.5 : 1,cursor: disabled ? "progress" : "pointer"}} onClick={onClick}>
   
      {!!icon && <div style={{marginRight: title ? 5 : 0}}>
        <Icon name={icon} color={variants[variant].color} size={iconSize}/>
      </div> }
      <Heading title={title} color={variants[variant].color} size={6} bold/>
    
    </Container>
}


export default Button