
import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../config';
import { useOrders } from '../contexts/orders';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import OrderCard from './OrderCard';

export const Container = styled.div`
    background-color: ${colors.gray100};
    width: 240px;
    height: 100vh;
    padding: 8px;

    > .header{
        background-color: ${colors.background_secondary};
        height: 48px;
    }

    > .group {
        
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
    
`;

const DeliveriesNavigator = () => {

    const orders = useOrders();
    
    const data = {
        DELIVERING: orders.filter(o => o.status === "DELIVERING")
    }

  return <Container>

      <div className="header">

      </div>

    { data.DELIVERING.length > 0 && <div className="group">
        <div className="header">
            <div className="title">
                <Icon name="arrow-right"/>
                Pendentes 
            </div> 
            <div className="qty">{data.DELIVERING.length}</div> 
        </div>
        <div className="content">
            {
                data.DELIVERING.map((o) => (
                    <OrderCard to={"/entregas/"+o.ref} data={o}/>
                ))
            }
        </div>
    </div> }

  </Container>;
}

export default DeliveriesNavigator;