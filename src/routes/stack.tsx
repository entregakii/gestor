import React from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import styled from 'styled-components';
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import OrdersNavigator from '../components/OrdersNavigator';
import Rating from '../components/Rating';
import { colors } from '../config';
import CatalogPage from '../pages/Catalog';
import DeliveriesPage from '../pages/Deliveries';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import OrdersPage from '../pages/Orders';

export const Container = styled.div`

    display: flex;
    overflow: hidden;
    height: 100%;
    background-color: ${colors.background};

    > .right {
        flex: 1;
        display: flex;
        height: 100%;
        justify-content: center;
       
        flex-direction: column;

        /* > .content {
            width: 100%;
        } */
        > .content {
            overflow: auto;
            width: 100%;
            height: 100%;
        }
        
    }

    @media(max-width: 600px){
        /* > .left{
            display: none;
        } */
        &{
            flex-direction: column-reverse;
        }
    }

`;

const Stack = (props:any) => {


  return <BrowserRouter><Container>

        <div className="left">

        <Navigator/>
     
    {/* 
            <Route component={({match}:any) => {

                if(match.url !== "/")
                    return  <Navigator/>
                else
                    return <></>
            }}/> */}

        </div>
        <OrdersNavigator/>
        <div className="right">
            {/* <Rating/> */}
            <Header/>
            <div className="content" id="content">
                <Switch>

                    <Route path="/" exact component={HomePage}/>

                    <Route path="/pedidos" exact component={OrdersPage}/>
                    <Route path="/pedidos/:id" component={OrdersPage}/>

                    <Route path="/entregas" exact component={DeliveriesPage}/>
                    <Route path="/entregas/:id" component={DeliveriesPage}/>

                    <Route path="/catalogo" exact component={CatalogPage}/>

                    <Route exact={false} path="/login" component={LoginPage}/>
                
                </Switch>
            </div>
        </div>
  </Container></BrowserRouter>;

}

export default Stack;