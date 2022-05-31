import React, { useEffect, useRef, useState } from 'react';
import { useOrders, useOrdersDispatch } from '.';
import { useApi, useSelector } from '../main';
import ALERT from '../../assets/alert2.mp3'
import { setInterval } from 'timers';
import { useAlert } from '../../hooks/alert';

import LOGO from '../../assets/logo.png'
// import { Container } from './styles';

const Timer = ({filter}:any) => {

    const max = 30;
    const [count, setCount] = useState(0)
    const [loading,setLoading] = useState(false);
    const api = useApi();
    const audioRef = useRef<HTMLAudioElement>(null);
    const player = audioRef ? audioRef.current : undefined;
    const orders = useOrders();

    const alert = useAlert();

    const [lastNotification,setLastNotification] = useState(new Date());
    

    const {setOrders,upsertOrders,acknowledgment} = useOrdersDispatch()



    // const getOrders = async () => {
    
    //     setLoading(true)
    //     const {data}:any = await api.get("/orders/first");
    //     setLoading(false)
    //     setOrders(data)
    //     acknowledgment(data);
    //     setCount(0)
    
    // }

    const getRecents = async () => {

        setLoading(true)
        const {data}:any = await api.get("/orders/recent",{
            params: {
                
            }
        });
        upsertOrders(data)
        setLoading(false)

        let count = data.filter((o:any) => o.status === "PDG").length
        if(count > 0)
            sendNotification(`🛍️ Você tem ${count} ${count === 1 ? "novo pedido para ser aceito" : "novos pedidos para serem aceitos"}`)
        
        await acknowledgment(data);
       
        setCount(0)    
    
    }

    // useEffect(() => {
    
    //     const intervalId = setInterval(() => {
    //         if(orders.filter(o => o.status === "PDG").length > 0){
    //             console.log(player)
    //             if( audioRef.current)
    //                 audioRef.current.play()
    //         }
    //     }, 1000 * 3) // in milliseconds
    //     return () => clearInterval(intervalId)
    //   }, [audioRef,orders])

    function requestPermission() {
        // Verifica se o browser suporta notificações
        if (!("Notification" in window)) {
            alert.open("WARNING",{message: "Este browser não suporta notificações de Desktop."});
        }
      
        // Let's check whether notification permissions have already been granted
      
      
        if (Notification.permission === 'denied') {
            alert.open("ERROR",{message: "Você negou as notificações, cuidado novos pedidos não serão notificados."});
            Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            
          });
        }
        // Otherwise, we need to ask the user for permission
        else if (!['denied','granted'].includes(Notification.permission )) {
            alert.open("WARNING",{message: "Ative as notificações para não perder nenhum pedido."});
            Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            
          });
        }
      
        // At last, if the user has denied notifications, and you
        // want to be respectful there is no need to bother them any more.
      }

      const sendNotification = (message:string) => {
        if (Notification.permission === "granted") {
            var notification = new Notification("Entregakii",{
                body: message,
                icon: LOGO
            });
            setLastNotification( new Date())
          }
      }

    useEffect(() => {
        requestPermission()
    },[Notification])
    
    useEffect(() => {

    
        if(!loading ){
            if(count < max){
                setTimeout(() => setCount(s => s+1), 1000)
            }
        }
      
    },[count])

    // useEffect(() => {
    //       getOrders();
    // },[])

    useEffect(() => {

        if(count === max){
            getRecents()
        }

        document.title = `(${orders.filter(o => !["CON","CAN"].includes(o.status)).length}) Gestor de pedidos - entregakii`

            let countOrders = orders.filter((o:any) => o.status === "PDG").length

          if((count%10 === 0) && countOrders > 0){
            if( audioRef.current)
                audioRef.current.play()

            console.log(new Date().getTime() - lastNotification.getTime())

            if(new Date().getTime() - lastNotification.getTime() > 30000){
                
                setLastNotification( new Date())

                if(count > 0)
                    sendNotification(`🛍️ Você tem ${countOrders} ${countOrders === 1 ? "novo pedido para ser aceito" : "novos pedidos para serem aceitos"}`)
                
            }

          }

    },[count,audioRef])

    useEffect(() => {
        getRecents()
    },[])

    return <><audio  ref={audioRef}>
        <source src={ALERT} />
    </audio></>
}

export default Timer;