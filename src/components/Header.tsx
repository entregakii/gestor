
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import config, { colors } from '../config';
import { useDispatch, useSelector } from '../contexts/main';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import Clock from './Clock';
import LOGO from '../assets/logo.png'
import WithContext from '../elements/WithContext';
import TextInput from '../elements/TextInput';
import Button from '../elements/Button';
import Menu from '../elements/Menu';
import { useOrders } from '../contexts/orders';

export const Container = styled.div`

    position: relative;
    width: 100%;
    border-bottom: 1px solid ${colors.background_secondary};
    height: 60px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;

    .merchantPicture {
      width: 24px;
      height: 24px;
      border-radius: 12px;
    }

    .logo {
      width: 24px;
      height: 24px;
      border-radius: 5px;
    }


    > .content {
        //background-color: ${colors.gray100};
        width: 100%;
        padding: 0 20px;
        max-width: 975px;
        display: flex;

        > div{
          flex: 1;
        }

        .left{
            display: flex;
            align-items: center;
        }

        .right {

          display: flex;
          align-items: center;
          justify-content: flex-end;

          .btn {
            width: 32px;
            margin-right: 12px;
            padding: 4px;
            cursor: pointer;
            height: 32px;
            border-radius: 5px;
            transition: 200ms;
            position: relative;

            .notify{
              position: absolute;
              background-color: ${colors.secondary};
              min-width: 18px;
              right: -5px;
              bottom: -3px;
              height: 18px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 10px;
            }

            .status{
              position: absolute;
              background-color: ${colors.secondary};
              min-width: 14px;
              right: -1px;
              bottom: -1px;
              border: 3px solid ${colors.background};
              height: 14px;
              border-radius: 7px;
            }

            &:hover{
              background-color: ${colors.gray100};
            }
          }
        }
       
    }

`;


const Header = () => {


  const {logout} = useDispatch()
  const orders = useOrders()
  let count = orders.filter((o:any) => o.status === "PDG").length
  const merchant = useSelector(state => state.merchant);
  const location = useLocation();

  let homeIcon:any = location.pathname === "/" ? "home" : "home_outline"
  let ordersIcon:any = location.pathname.includes("pedidos") ? "order" : "order_outline"
  let catalogIcon:any = location.pathname.includes("catalogo") ? "book_solid" : "book"


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
           <img className='logo' src={LOGO}/>
           <div style={{width: 10}}/>
           <div className='max450'>
              <Heading title="Gestor" bold/>
           </div>
           <div className='min450'>
              <Heading title="Gestor de pedidos" bold/>
           </div>
        </div>
     
        <div className="right">
            {/* <div className='min750'>
              <Clock/>
            </div> */}
            <NavLink className="link" to="/" children={<div className='btn' title='Início'><Icon name={homeIcon}/></div>} />
            <NavLink className="link" to="/pedidos" children={<div className='btn'>
              {count > 0 && <div className='notify'><Heading color={colors.background} title={count.toString()} bold size={6}/></div> }
            <Icon name={ordersIcon}/></div>}/>
            <NavLink className="link" to="/catalogo" children={<div className='btn'><Icon name={catalogIcon}/></div> }/>
            {/* <WithContext
              width={400}
              right={-44}
              trigger={<div className='btn'><Icon name="search_outline"/></div>}
              context={<div style={{padding: 20,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <Heading title="Buscar pedido" align="center" bold/>
                <Heading title="Insira abaixo o código do pedido e clique em buscar" size={6} align="center" />
                <div style={{paddingTop: 10}}>
                  <TextInput />
                  <Button title="Buscar" flex/>
                </div>
              </div>}
            /> */}
            <WithContext
              trigger={<div className='btn'>
                <img className='merchantPicture' src={config.url.merchantsImagens+merchant.picture}/>
                  <div className='status' style={{backgroundColor: closeIn ? colors.green400 : colors.red400}}/>
              </div>}
              context={<div>
                <div className="top" style={{display: 'flex',flexDirection: 'column',alignItems: 'center',padding: "15px 0"}}>
                  <Heading title={merchant.name} size={4} bold align="center"/>
                  { isBreak ? <>
                    <Heading title="Fechado dentro do horário programado" color={colors.red400} align="center" bold size={7}/>
                  </> : <>
                      {closeIn ? <>
                        <Heading color={colors.green400} title={"Aberto" + (closeIn < 0.5 ? `- fecha em ${Math.round(closeIn * 60)} minutos` : "")} size={4} bold />
                        { closeIn < 0.5 && <Heading color={colors.gray500} title={`Fecha em ${Math.round(closeIn * 60)} minutos`} size={7} bold /> }
                      </> :  <Heading color={colors.red400} title={"Fechado"} size={4} bold /> }
                  </>}
                
                </div>

                <Menu
                context={[
                  // {title: "Fechar temporáriamente",icon:"stopwatch",onclick: () => {document.location.href = ""}},
                  {title: "Desconectar",icon:"logout",onClick:logout}
                ]}
              />

              </div>}
            />

           
              
        </div>
        {/* <div className="right">
            { isBreak ? <div className="status close"><Heading title="Fechado dentro do horário programado" color={colors.red400} align="center" bold size={7}/></div> : <>
                {closeIn ? <div className="status open">Aberto {closeIn < 0.5 && `- fecha em ${Math.round(closeIn * 60)} minutos`}</div> : <div className="status close">Fechado</div> }
            </>}
            <img src={config.url.merchantsImagens+merchant.picture} />
            <Clock/>
        </div> */}
    </div>

  </Container>;
}

export default Header;

function useOrdersSelector(arg0: (s: any) => any): {} {
  throw new Error('Function not implemented.');
}
