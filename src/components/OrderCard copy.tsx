import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../config';
import { useSelector } from '../contexts/main';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import { formatTime, getTimeDifference, toDeliveryType } from '../services/functions';

export const Container = styled.div`

    border-radius: 12px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    background-color: ${colors.background};
    color: ${colors.subtitle};
    transition: 200ms;
    width: 200px;
    height: 120px;

    &:hover{
        opacity: 0.8;
    }

    > .top{
        align-items: center;
        justify-content: space-between;
        
        display: flex;

        .title{
            font-family: Whitney Bold;
        }

        .status {

            display: flex;
            align-items: center;

            > .icon-container {

                padding: 3px;
                background-color: ${colors.background};
                border-radius: 15px;

                > .icon {
                  
                    &.pending{
                        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
                    }

                }
           
            }

            > .text {
                line-height: 10px;
                display: flex;
                align-items: center;
                font-size: 0.8rem;
                margin-right: -6px;
                font-family: Whitney Bold;
                height: 16px;
                color: ${colors.background};
                background-color: ${colors.error};
                padding: 0px 10px;
                border-radius: 15px 0px 0px 15px;
                padding-right: 13px;
            }

        }
    }

    > .bottom {
        padding: 5px 0;
    }

    .line{
       
    }

    .tag {
        display: inline-block;
        border-radius: 30px;
        font-family: Whitney Bold;
    }

    @keyframes shake {
        10% {
            transform: rotate(-10deg);
        }

        20% {
            transform: rotate(10deg);
        }

        30% {
            transform: rotate(-5deg);
        }

        40% {
            transform: rotate(5deg);
        }
        
        50% {
            transform: rotate(0deg);
        }
    }

`;

const OrderCard = ({data,to = "/"}:any) => {

    const [time,setTime] = useState(new Date());
    // const {merchant} = useSelector(s=>s);

    useEffect(() => {
        setTimeout(() => {
            setTime(new Date())
        },1000)
    },[time])

    let toAccept = (15*60) - Math.round((time.getTime() - new Date(data.orderedDateTime).getTime()  ) / 1000 )

    let timeOut = toAccept > 60 ? Math.floor(toAccept/60)+1+"m" : toAccept+"s"

    let timeToFinish = new Date(data.estimatedMinDateTime).getTime() - time.getTime() 
    // if(toAccept < 0)
    //     co

    let late = time.getTime() > new Date(data.details.estimatedMinDateTime).getTime();
    

    const cards:any = {
        "PDG": <Container>
            <div className="top" >
                <div className="title" style={{color: colors.orange400}}>#{data.ref}</div>
                <div className="status" style={{color: colors.orange400}}>
                    <div className="text" style={{backgroundColor: colors.orange400}}>{toAccept > 0 ? timeOut : "0s"}</div>
                    <div className="icon-container">
                        <div className="icon pending"><Icon name="stopwatch"/></div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <Heading title="Confirme o pedido"/>
                <Heading bold title={toDeliveryType(data.type)}/>
               
                
            </div>
        </Container>,
        "CFM": <Container>
            <div className="top" >
                <div className="title" style={{color: colors.yellow400}}>{data.user && (data.user.name || data.user.phone)}</div>
                <div className="status" style={{color: colors.yellow400}}>
                    <div className="text" style={{backgroundColor: late ? colors.red400 :  colors.yellow400}}>{getTimeDifference(time,data.details.estimatedMinDateTime)}</div>
                    <div className="icon-container">
                        <div className="icon pending"><Icon name="indoor"/></div>
                    </div>
                 
                </div>
            </div>
            <div className="bottom">
                <Heading title={`Conclua em ${getTimeDifference(time,data.details.estimatedMinDateTime)}`}/>
                <Heading bold title={toDeliveryType(data.type)}/>
                
            </div>
        </Container>,
        "DSP": <Container>
        <div className="top" >
            <div className="title" style={{color: colors.green200}}>{data.user && (data.user.name || data.user.phone)}</div>
            <div className={"status "} style={{color: colors.green200}}>
                <div className="text" style={{backgroundColor: late ? colors.red400 : colors.green200}}>{getTimeDifference(time,data.estimatedMaxDateTime)}</div>
                <div className="icon-container">
                    <div className="icon pending"><Icon name="motocycle"/></div>
                </div>
             
            </div>
        </div>
        <div className="bottom">
                <Heading bold title={"Entregando"}/>
        </div>
    </Container>,
     "RTP": <Container>
     <div className="top" >
         <div className="title" style={{color: colors.green200}}>{data.user && (data.user.name || data.user.phone)}</div>
         <div className="status" style={{color: colors.green200}}>
             <div className="text" style={{backgroundColor: late ? colors.red400 : colors.green200}}>{getTimeDifference(time,data.estimatedMaxDateTime)}</div>
             <div className="icon-container">
                 <div className="icon pending"><Icon name="motocycle"/></div>
             </div>
          
         </div>
     </div>
     <div className="bottom">
        <Heading bold title={"Aguardando cliente"}/>
         
     </div>
 </Container>,
 "CON": <Container>
 <div className="top" >
     <div className="title" style={{color: colors.green400}}>{data.user && (data.user.name || data.user.phone)}</div>
 </div>
 <div className="bottom">
    <Heading bold title={"Concluído"}/>
 </div>
</Container>
    }   

  return <NavLink className="link" to={to} activeClassName="active">
        {cards[data.status]}
    </NavLink>
  
}

export default OrderCard;