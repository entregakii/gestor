import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Clock from "../components/Clock";
import DeliveriesNavigator from "../components/DeliveriesNavigator";
import OrdersNavigator from "../components/OrdersNavigator";
import config, { colors } from "../config";
import { useDispatch, useSelector } from "../contexts/main";
import { useOrders } from "../contexts/orders";
import Heading from "../elements/Heading";
import cookie from "../services/cookie";
import OrderPage from "./Order";

export const Container = styled.div`
 
  width: 100%;
  height: 100vh;

  background-color: #f0f2f5;
//  background-image: linear-gradient(180deg, #eae6df, #d1d7db);

    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


  .progressBar{
      height: 3px;
      width: 300px;
      border-radius: 1.5px;
      background-color: #bbc5cb;
      margin: 20px 0;

      .progress{
        height: 3px;
        border-radius: 1.5px;
        background-color: #00ddaa;
        transition: width 200ms;
     
    }

  }
  
`;

const CloseConectionPage = ({ match }: any) => {

  
  return (
    <Container>
      <div className="content">
       
       
        <Heading align="center" title="Desconectado" color={colors.title}/>
        <Heading align="center"  size={4} color={colors.subtitle} title={"O gestor detectou outra sessão nesta mesma conta."}/>
      </div>
    </Container>
  );
};

export default CloseConectionPage;
