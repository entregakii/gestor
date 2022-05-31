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
  z-index: 1000;

  .context {
    position: absolute;
    top:calc(100% + 12px);
    min-height:40px;
    max-width: calc(100vw - 40px);
    background-color: ${colors.background};
    box-shadow: 0 0 5px 1px rgba(0,0,0,.0975);
    border-radius: 10px;

    > .arrow{
      z-index: +1;
      content: "";
      display: block;
      background-color: ${colors.background};
      top: -6px;
      box-shadow: 0 0 5px 1px rgba(0,0,0,.0975);
      height: 14px;
      position: absolute;
      transform: rotate(45deg);
      width: 14px;
    }


    > .content {
      overflow: hidden;
      z-index: +2;
      position: relative;
      border-radius: 10px;
      height: 100%;
      max-width: calc(100vw - 40px);
      min-height:40px;
      padding: 10px;
      background-color: ${colors.background};
    }

   
  }

`;


const WithContext = ({trigger,context,width = 300,right = 0}:any) => {

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

  return <Container >
   
        <div onClick={toggle}>
            {trigger}
        </div>

      {show && <div className='context' style={{width,right}}>
        <div className='arrow' style={{right:Math.abs(right)+20}}/>
        <div className='content' style={{width}}>
          {context}
        </div>
      </div> }
    
    </Container>
}

export default WithContext