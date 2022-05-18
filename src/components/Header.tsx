
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import config, { colors } from '../config';
import { useSelector } from '../contexts/main';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import Clock from './Clock';

export const Container = styled.div`

    position: relative;

    > .content {
        background-color: ${colors.background};
        width: 100%;
        height: 48px;
        padding: 4px;
        display: flex;
        border-bottom: 1px solid ${colors.background_secondary};

        > .left{
          flex: 1;
        }
        > .right {
          display: flex;
          align-items: center;

          > .status{
            margin-right: 10px;
            font-family: 'Whitney Bold';
            font-size: 0.75rem;
            border-radius: 30px;
            border: 1px solid;
            padding: 2px 20px;

            &.close{
                border-color: ${colors.error};
                color:  ${colors.error};
            }
            &.open{
                border-color: ${colors.success};
                color: ${colors.success};
            }
        }
       

          > img{
            width: 35px;
            height: 35px;
            border-radius:  20px;
          }
        }
    }

`;


const Header = () => {

  const merchant = useSelector(state => state.merchant);

  const [closeIn,setCloseIn] = useState<number|undefined>();
  const [time,setTime] = useState(new Date().getTime())

  const checkIsBreak = () => {
      const find = merchant.scheduledBreaks.find((sc:any) => time >= new Date(sc.startTime).getTime() && time < new Date(sc.endTime).getTime())
      return !!find;
  }

  const checkIsOpen = () => {
      let datetime = new Date(time);
      let weekdays = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"]
      let dayOfWeek = weekdays[datetime.getDay()];
      let now = datetime.getHours() + (datetime.getMinutes()/60)


      merchant.schedules.map((sc:any) => {
        
      
          if(sc.weekDay === dayOfWeek){

            

              if(now > parseFloat(sc.startTime) && now < parseFloat(sc.endTime)){
                  let closein = parseFloat(sc.endTime) - now;
                  setCloseIn(closein)
                // setIsOpen(true) 
              }
          }
      })
  }

    useEffect(() => {
      checkIsOpen()
  },[merchant])

  useEffect(() => {
    setTimeout(() => {
        setTime(new Date().getTime())
    },10000)
  },[time])

  const isBreak = checkIsBreak();

  if(!merchant)
    return <></>

  return <Container>

    <div className="content">
        <div className="left">
           
        </div>
        <div className="right">
            { isBreak ? <div className="status close"><Heading title="Fechado dentro do horário programado" color={colors.red400} align="center" bold size={7}/></div> : <>
                {closeIn ? <div className="status open">Aberto {closeIn < 0.5 && `- fecha em ${Math.round(closeIn * 60)} minutos`}</div> : <div className="status close">Fechado</div> }
            </>}
            <img src={config.url.merchantsImagens+merchant.picture} />
            <Clock/>
        </div>
    </div>

  </Container>;
}

export default Header;