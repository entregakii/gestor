import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import styled from 'styled-components';
import Icon from '../elements/Icon';

const Container = styled.div`
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: absolute;
`;


const Rating = () => {

    let rate = 5;
    let stars = [];

    const [show,setShow] = useState(false);

    for(var n = 0; n <= rate*5;n+=2){
        stars.push({
            size: Math.random()*10 + (n*2)
        })
    }
    
    const start = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
            start()
        },2000)
    }

    useEffect(() => {
        start()
    },[])
    

  return <Container>
      <div className='title'>

      </div>
      <div className='stars'>
            {show && stars.map(s => <Star size={s.size}/>)}
      </div>
  </Container>;
}

const StarContainer = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    opacity: 1;
    position: absolute;
    bottom: 0;

   

@keyframes flowOne {
    0% {
        opacity: 0;
        bottom: -100px;
        left: 14%;
    }
    10%{
        opacity: 1;
    }
    40% {
        opacity: 1;
    }
    50% {
        opacity: 1;
        left: 0;
    }
    60% {
        opacity: .2;
    }
    80% {
        bottom: 80%;
    }
    100% {
        opacity: 0;
        bottom: 100%;
        left: 18%;
    }
    }
    @keyframes flowTwo {
        0% {
        opacity: 0;
        bottom: -100px;
        left: 0;
    }
    20% {
        opacity: 1;
    }
    50% {
        left: 11%}
    60% {
        opacity: .2;
    }
    80% {
        bottom: 60%}
    100% {
        opacity: 0;
        bottom: 80%;
        left: 0;
    }
    }
    @keyframes flowThree {
        0% {
        opacity: 0;
        bottom: -100px;
        left: 0;
    }
    40% {
        opacity: .8;
    }
    50% {
        opacity: 1;
        left: 30%}
    60% {
        opacity: .2;
    }
    80% {
        bottom: 70%}
    100% {
        opacity: 0;
        bottom: 90%;
        left: 0;
    }
    }
`;

const Star = ({size}:any) => {

    const ref = useRef<HTMLDivElement>(null);
    const [visible,setVisible] = useState(false);

    var b = Math.floor((Math.random() * 100) + 1);
    var d = ["flowOne", "flowTwo", "flowThree"];
    var s = Number((Math.random() * (1.6 - 1.2) + 1.2).toFixed(1))
    
    var animation = d[Math.floor((Math.random() * 3))];

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, s*1000);
        setVisible(true)
    },[])

    if(!visible)
        return <></>

    return <StarContainer style={{animation: `${animation} ${s}s linear`}} ref={ref}>
    
        <Icon name="star" color='#fa0' size={size}/>
    
    </StarContainer>;
  }

export default Rating;