import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { start } from 'repl';

import styled from 'styled-components';
import { colors } from '../config';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import { formatTimeWithExtension } from '../services/functions';

export const Container = styled.div`


    min-width: 200px;
    width: 100%;
    position: relative;

    .top {
        width: 100%;
        display: flex;
        align-items: center;

    }
    .bottom {

        width: 100%;
        padding: 5px 0;

        .indicator {
            box-shadow: 2px 5px 6px #0001;
            width: 24px;
            /* height: 24px; */
            padding: 3px;
            border-radius: 12px;
            background-color: #fff;
            transform: translateX(-12px);
            position: relative;

            &::before{
                box-shadow: 2px 5px 6px #0001;
                width: 3px;
                height: 20px;
                background-color: #fff;
                position: absolute;
                display: block;
                content: "";
                top: -17px;
                left: 11.5px;
                border-radius: 1.5px;
            }
        }
    }

    .icon{
        position: absolute;
        margin: 0 5px;
        white-space: nowrap;

        &.left{
            right: 100%;
        }
        &.right {
            left: 100%;
        }
    }

    .progressBar{
        flex: 1;
        width: 100%;
        background-color: ${colors.gray200};
        height: 10px;
        border-radius: 10px;
        display: flex;
        overflow: hidden;

        .progress{
            height: 10px;
        }
    }
`;


const StatusProgress = ({data}:any) => {

    let icons:any = {
        "PDG": "stopwatch",
        "CFM": "indoor",
        "RTP": "walking",
        "DSP": "motocycle",
        "CON": "check"
    }

    let texts:any = {
        "PDG": "Pendente",
        "CFM": "Preparando",
        "RTP": "Aguardando cliente",
        "DSP": "Entregando",
        "CON": "Concluído",
        "CAN": "Cancelado"
    }

    let textcolors:any = {
        "PDG": colors.orange400,
        "CFM": colors.yellow400,
        "RTP": colors.green200,
        "DSP": colors.green200,
        "CON": colors.green400,
        "CAN": colors.red400
    }

    const [now,setNow] = useState(new Date());

  
    let current = now.getTime();

    let orderedDateTime = new Date(data.orderedDateTime).getTime();
    let confirmedDateTime =  new Date(data.details.confirmedDateTime).getTime();
    let concludedDateTime = new Date(data.concludedDateTime || data.details.concludedDateTime).getTime();
    let dispachedDateTime = new Date(data.details.despatchedDateTime).getTime();

    let estimatedMaxDateTime = new Date(data.details.estimatedMaxDateTime).getTime()

    let total = estimatedMaxDateTime - orderedDateTime

  

   

    let progresstotal = data.status !== "CON" ? (current - orderedDateTime)*100/total : (concludedDateTime - orderedDateTime)*100/total;
    let progressPending =  data.status === "PDG" ? (progresstotal) : (confirmedDateTime - orderedDateTime)*100/total ;
    let progressPreparing = data.status === "CFM" ? (progresstotal-progressPending) : (dispachedDateTime - confirmedDateTime)*100/total;
    let progressDelivering = data.status === "DSP" || data.status === "RTP"  ? (progresstotal-progressPending-progressPreparing) : (current - dispachedDateTime)*100/total


    useEffect(() => {
        setTimeout(() => {
            setNow(new Date());
        }, 1000);
    },[now])
   

  return <Container>
      <div className='top'>
        {/* <div className='icon left'>
            <Heading title={formatTimeWithExtension(data.orderedDateTime,false)} size={5} bold/>
        </div> */}
        {
            data.status !== "CON" ?
            <>{ progresstotal > 100 || data.status === 'CAN' ? <div className='progressBar' style={{backgroundColor: colors.red400}}></div>
            : <div className='progressBar'>
                <div className='progress' style={{width: progressPending+"%",backgroundColor: colors.orange400}}/>
                <div className='progress' style={{width: progressPreparing+"%",backgroundColor: colors.yellow400}}/>
                <div className='progress' style={{width: progressDelivering+"%",backgroundColor: colors.green200}}/>
            </div>
         }</>
        : <div className='progressBar' style={{backgroundColor: colors.green400}}></div>}
        {/* <div className='icon right'>
            <Heading title={formatTimeWithExtension(data.details.estimatedMaxDateTime,false)} size={5} bold/>
        </div> */}
      </div>
  
      {/* { progresstotal <= 100 
        ?  */}
        <div className='bottom'>
            <div className='indicator' style={{left: progresstotal > 100 ? "100%" : progresstotal+"%"}}>
                <Icon name={ progresstotal <= 100 ? icons[data.status] : "stopwatch"} size={18}/>
            </div>
        </div> 
        {/* : <div className='bottom' style={{justifyContent: "center",display: 'flex',paddingTop: 10}}>
             <Heading bold title="Pedido está atrasado!" color={colors.red400}/>
         </div> } */}

        {/* <div className='bottom' style={{justifyContent: "center",display: 'flex'}}>
            <Heading size={4} bold title={texts[data.status]} color={ progresstotal <= 100 ? textcolors[data.status] : colors.red400}/>
        </div> */}
  </Container>
}

export default StatusProgress;