
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

export const Container = styled.div`

    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;

    .merchantPicture {
      width: 56px;
      height: 56px;
      border-radius: 28px;
    }

    .right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
    }

`;


const UserProfile = () => {

  const {merchant,user}:any = useSelector(state => state);

  return <Container>

      <img className='merchantPicture' src={config.url.merchantsImagens+merchant.picture}/>
      <div className='right'>
          <Heading title={merchant.name} bold size={5}/>
          <Heading title={user.email} size={4} color={colors.gray500}/>
      </div>

  </Container>;
}

export default UserProfile;