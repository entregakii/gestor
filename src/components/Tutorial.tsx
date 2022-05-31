import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
// import { Container } from './styles';
import styled from 'styled-components';
import { setTimeout } from 'timers';
import useSound from 'use-sound';
import ALERT from '../assets/alert.mp3'
import CANCELED from '../assets/illustrations/CANCELED.png';
import CONCLUDED from '../assets/illustrations/CONCLUDED.png';
import Illustration from '../components/Illustration';
import OrderHeaderSession from '../components/OrderHeaderSession';
import OrderProgress from '../components/OrderProgress';
import StatusProgress from '../components/StatusProgress';
import config, { colors } from '../config';
import { useApi, useSelector } from '../contexts/main';
import { useOrdersDispatch } from '../contexts/orders';
import Button from '../elements/Button';
import Flex from '../elements/Flex';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import Image from '../elements/Imagem';
import Loading from '../elements/Loading';
import { useAlert } from '../hooks/alert';
import { usePrint } from '../hooks/usePrint';
import { decimalToMoney, formatDateTime, formatTimeWithExtension, toDeliveryType } from '../services/functions';

import TUTORIAL1 from '../assets/illustrations/tutorial_1.png'
import TUTORIAL2 from '../assets/illustrations/tutorial_2.png'
import TUTORIAL3 from '../assets/illustrations/tutorial_3.png'


const Container = styled.div`
    position: absolute;
    z-index: 1000;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 100%;
   left: 0;
   bottom: 0;
   right: 0;
   top: 0;
   padding: 100px 50px;
   overflow: hidden;

   > .background {
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: #0007;
      position: absolute;
   }

   > .window{

      position: relative;
      background-color: #fff;
      border: 1px solid ${colors.background_secondary};
      padding: 10px;
      width: 100%;
      max-width: 800px;
      border-radius: 12px;
      display: flex;
      height: 100%;

      > div {
        height: 100%;
        padding: 20px;
        overflow: auto;
       
        > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

        }
      }

   }


   @media (max-width: 700px){

        padding: 50px 20px;

   }

   
   @media (max-width: 400px){

    padding: 50px 20px;

        > .window{
            >div {
                padding: 0px;
            
            }
        }
    }

`;




const Tutorial = ({data}:any) => {

    const [visible,setVisible] = useState(true);

    if(!visible)
        return <></>

  return <Container>

    <div className='window'>

        <div>
            <div>

        <Heading title="Atenção" bold size={1}/>
        <div style={{padding: "10px 20px",maxWidth: 400}}>
        <Heading title="Siga as etapas a seguir para você não correr o risco de não ser alertado sobre novos pedidos." align="center" size={5}/>
        </div>
        <Flex  flex={[1,1]} gap={10}  changeDirectionWith={700}>
            <div style={{padding: 10}}>
                <Image src={TUTORIAL1} width="100%"/>
            </div>
            <div style={{padding: "25px 10px"}}>
                <Heading title="*Clique* no icone de cadeano no canto superior esquerdo, próximo a URL do site" size={5}/>
            </div>
        </Flex>

        <Flex flex={[1,1]} gap={10} changeDirectionWith={700} reverse>
            <div style={{padding: 10}}>
                <Image src={TUTORIAL2} width="100%"/>
            </div>
            <div style={{padding: "25px 10px"}}>
                <Heading title="*Verifique* se as _notificações_ e o _som do site_ estão ativados, caso não estajam, ative-os!" size={5}/>
            </div>
        </Flex>

        <Flex flex={[1,1]} gap={10}  changeDirectionWith={700}>
            <div style={{padding: 10}}>
                <Image src={TUTORIAL3} width="100%"/>
            </div>
            <div style={{padding: "25px 10px"}}>
                <Heading title="*Certifique-se* de que este ícone localizado no canto superior direito não apareça, caso você o veja, significa que o som do site está desativado! Clique nele, em seguida habilite _Permitir sempre som_ e clique em _Concluído_" size={5}/>
            </div>
        </Flex>


        <Button onClick={() => setVisible(false)}  title="Continuar" variant="contained"/>

    </div></div>

    </div>

   <div className='background'/>

  </Container>;
}


export default Tutorial;