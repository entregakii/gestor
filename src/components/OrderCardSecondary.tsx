
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import config, { colors } from '../config';
import { useSelector } from '../contexts/main';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import Clock from './Clock';
import LOGO from '../assets/logo.png'
import WithContext from '../elements/WithContext';
import TAKEOUT from '../assets/TAKEOUT.png'
import INDOOR from '../assets/INDOOR.png'
import DELIVERY from '../assets/DELIVERY.png'
import { decimalToMoney } from '../services/functions';
import Button from '../elements/Button';
import OrderProgress from './OrderProgress';

export const Container = styled.div`

    width: 100%;
    display: flex;
    flex-shrink: 0;
    padding: 5px 0 ;
    padding-left: 20px;
    cursor: pointer;

    .merchantPicture {
      width: 32px;
      height: 32px;
      border-radius: 16px;
    }

    .right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
    }

`;


const OrderCardSecondary = ({data}:any) => {


    const types:any = {
        DELIVERY,
        TAKEOUT,
        INDOOR
    }

  return <WithContext 
    right={-100}
    width={400}
    trigger={<Container>
        <img className='merchantPicture' src={types[data.type]}/>
        <div className='right'>
            <Heading title={"Pedido #"+data.ref} bold size={5}/>
            <Heading title={"Pendente"} size={5} color={colors.gray500}/>
        </div>
        <OrderProgress type="timeout" data={data}/>
    </Container>}
    context={<></>}
    />
}

export default OrderCardSecondary;