import { useState } from 'react';

import Stack from './stack';
import { useSelector } from '../contexts/main';
import LoginPage from '../pages/Login';
import InitializationPage from '../pages/Initilization';
import CloseConectionPage from '../pages/CloseConection';
import OrdersProvider from '../contexts/orders';

const Routes = () => {
   
    const {user,login} = useSelector(state => state)

    console.log(login?.status)

    if(login && login.status){

        if(login.status === "initializing" || login.status === "logged")
            return <InitializationPage/>
        else if(login.status === "notlogged")
            return <LoginPage/>
        else if(login.status === "disconected")
            return <CloseConectionPage/>
        else if(login.status === "completed")
            return <OrdersProvider><Stack/></OrdersProvider>
    }
  
    return <></>
 
 
}


export default Routes