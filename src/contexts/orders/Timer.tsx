import React, { useEffect, useRef, useState } from 'react';
import { useOrders, useOrdersDispatch } from '.';
import { useApi, useSelector } from '../main';
import ALERT from '../../assets/alert.mp3'
import { setInterval } from 'timers';
// import { Container } from './styles';

const Timer = ({filter}:any) => {

    const max = 30;
    const [count, setCount] = useState(0)
    const [loading,setLoading] = useState(false);
    const api = useApi();
    const audioRef = useRef<HTMLAudioElement>(null);
    const player = audioRef ? audioRef.current : undefined;
    const orders = useOrders();



    

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

          if((count%3 === 0) && orders.filter(o => o.status === "PDG").length > 0)
            if( audioRef.current)
                audioRef.current.play()

    },[count,audioRef])

    useEffect(() => {
        getRecents()
    },[])

    return <><audio  ref={audioRef}>
        <source src={ALERT} />
    </audio></>
}

export default Timer;