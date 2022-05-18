
import React from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import { useOrders, useOrdersDispatch } from '../contexts/orders';
import OrderCard from './OrderCard';


export const Container = styled.div`
    background-color: ${colors.gray100};
    width: 240px;
    height: 100vh;
  
    overflow: auto;

    > .header{
        border-bottom: 1px solid ${colors.background_secondary};
        height: 48px;
    }

    > .group {
        
        padding: 8px;

        > .header {

            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
        

            >.title{
                display: flex;
                align-items: center;
                font-family: Whitney Bold;
                cursor: pointer;
                font-size: 1.25rem;
                transition: 200ms;

                &:hover{
                    opacity: 0.7;
            
                }
            }
            >.qty{
                font-family: Whitney Bold;
                font-size: 1.25rem;
            }
        }
        >.content{

            padding: 10px;

            > .link{

                margin-bottom: 12px;
                display: block;

                .item {

                    border-radius: 12px;
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    background-color: ${colors.background};
                    color: ${colors.subtitle};
                    transition: 200ms;
                    

                    &:hover{
                        opacity: 0.8;
                    }

                    > .top{
                        align-items: center;
                        justify-content: left;
                        font-family: Whitney Bold;
                        display: flex;
                    }
                }
            }
        }
    }   
    
    ::-webkit-scrollbar-thumb {
     border-radius: 10px;
     border: 3px solid ${colors.gray100};
     background: #ddd;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.gray100};
  }

`;

const OrdersNavigator = () => {

    const orders = useOrders();
    const {setFilter} = useOrdersDispatch();
    
    const data = {
        PDG: orders.filter(o => o.status === "PDG"),
        CFM: orders.filter(o => o.status === "CFM"),
        DSP: orders.filter(o => o.status === "DSP"),
        RTP: orders.filter(o => o.status === "RTP"),
        CON: orders.filter(o => o.status === "CON")
    }

  return <Container>


    { data.PDG.length > 0 && <div className="group">
        <div className="header">
            <div className="title">
                {/* <Icon name="arrow-right"/> */}
                Pendentes 
            </div> 
            <div className="qty">{data.PDG.length}</div> 
        </div>
        <div className="content">
            {
                data.PDG.map((o) => (
                    <OrderCard data={o} to={"/pedidos/"+o.ref.toString().toString()}/>
                ))
            }
        </div>
    </div> }

    { data.CFM.length > 0 && <div className="group">
        <div className="header">
            <div className="title">
                {/* <Icon name="arrow-right"/> */}
                Preparando
            </div> 
            <div className="qty">{data.CFM.length}</div> 
        </div>
        <div className="content">
            {
                data.CFM.map((o) => (
                    <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
                ))
            }
        </div>
    </div> }

    { data.DSP.length > 0 && <div className="group">
        <div className="header">
            <div className="title">
                {/* <Icon name="arrow-right"/> */}
                Entregando 
            </div> 
            <div className="qty">{data.DSP.length}</div> 
        </div>
        <div className="content">
            {
                data.DSP.map((o) => (
                    <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
                ))
            }
        </div>
    </div> }

    { data.RTP.length > 0 && <div className="group">
        <div className="header">
            <div className="title">
                {/* <Icon name="arrow-right"/> */}
                Aguardando cliente 
            </div> 
            <div className="qty">{data.RTP.length}</div> 
        </div>
        <div className="content">
            {
                data.RTP.map((o) => (
                    <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
                ))
            }
        </div>
    </div> }


    { data.CON.length > 0 && <div className="group">
        <div className="header">
            <div className="title">
                {/* <Icon name="arrow-right"/> */}
                Concluídos recentemente
            </div> 
            <div className="qty">{data.CON.length}</div> 
        </div>
        <div className="content">
            {
                data.CON.map((o) => (
                    <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
                ))
            }
        </div>
    </div> }

  </Container>;
}

export default OrdersNavigator;