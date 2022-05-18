import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import { useApi } from '../contexts/main';
import { useOrdersDispatch } from '../contexts/orders';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import { useAlert } from '../hooks/alert';



const Container = styled.div`
    /* background-color: #f40; */
    width: 100%;
    overflow: hidden;
    height: 100vh;
    position: relative;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    transition: 500ms;
 
    &.finished {
      height: 0px;
    }


    .content {

      width: 100%;
      height: 100%;
      display: flex;
     
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .header{
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
     
      }

      @keyframes animationButtons {
        0%{
          transform: translateY(-5px);
        }
        50%{
          transform: translateY(5px);
        }
        100%{
          transform: translateY(-5px);
        }
      }

      .footer{
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: all;
        z-index: 1000;
        cursor: pointer;
      }

      .buttons {

        padding: 20px 0;
        display: flex;
        width: 200px;
        height: 120px;
        position: relative;
        align-items: center;
        justify-content: center;

        .accept,.reject,.loading {
          transition: 300ms;
            width: 100px;
            position: absolute;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            z-index: 100;

          .circle {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            cursor: pointer;
            animation: animationButtons  3s infinite;
            z-index: 1;

       

            &:hover{
              .bg{
                width: 100vw;
                height: 100vw;
              }
            }

          }

          .bg{
            pointer-events: none;
              width: 0;
              height: 0;
              transition: 0.2s;
          
              position: absolute;
              z-index: -10;
              border-radius: 50%;
            }
          
        }
        .accept {

          right: 0;

          .circle {
            background-color: ${colors.green400};
            .bg{
              background-color: ${colors.green400};
            }
          }
        }
        .loading {

         

          .circle {
            border: 5px solid ${colors.gray300};
            border-bottom-color: transparent;
            animation: rotate 1s infinite linear;
          }

          @keyframes rotate {
            0%{
              transform: rotate(-360deg);
            }
           
          }

          &.fromaccept {
            animation: fromRight 1s;
          }
          &.fromreject {
            animation: fromLeft 1s;
          }

        }
        .reject {
          left: 0;
          .circle {
            background-color: ${colors.red400};
            animation-delay: 500ms;
            .bg{
              background-color: ${colors.red400};
            }
          }
        }

        &.loading {
            .reject,.accept{
              opacity: 0;
            }
        }
      }
    }

    .background {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;


      .circle{
        transform: scale(1);
        transition: 200ms;
        z-index: -1;
        width: 50px;
        height: 50px;
        background-color: ${colors.gray200};
        border-radius: 50%;
        animation: circleAnimation 3s  both;
        animation-iteration-count: infinite;
        position: absolute;
      }

      
      &.success {
        .circle {
          animation-iteration-count: 1;
          animation-name: none;
          opacity: 0;
        }

        .circle:first-child {
        //  transform: scale(20);
          background-color: ${colors.gray50};
          animation-iteration-count: 1;
          animation-duration: 1s;
          opacity: 1;
          animation-name: circleAnimation2 ;
          /*animation-play-state: running; */
        }
        /* .circle:first-child{
        } */
      }
      &.failed {
        .circle {
          animation-iteration-count: 1;
        }
        .circle:first-child  {
         // transform: scale(20);
         animation-name: circleAnimation2;
         animation-duration: 1s;
          background-color: ${colors.red400};
          animation-iteration-count: 1;
        }
      }

    }

  

    @keyframes fromRight {
      0%{
        opacity: 0;
        transform: translateX(50px);
      }
    }
    @keyframes fromLeft {
      0%{
        opacity: 0;
        transform: translateX(-50px);
      }
    }

    @keyframes circleAnimation {
      0%{
        transform: scale(1);
        opacity: 0;
      }
      20%{
        opacity: 0.5;
      }
      100%{
        transform: scale(20);
        opacity: 0;
      }
    }
    @keyframes circleAnimation2 {
      0%{
        transform: scale(1);
        opacity: 0;
      }

      /* 70%{
        transform: scale(20) translateY(-25%);
      } */
  
      100%{
        width: 200vw;
        height: 200vw;
        bottom: 0;
        opacity: 1;
      }
    }
    
`;



const OrderHeaderSession = ({data,setOrder}:any) => {

    const [loading,setLoading] = useState(false);
    const alert = useAlert();
    const api = useApi();
    const {updateOrder} = useOrdersDispatch()

    const handleOnAccept = async () => {
        if(loading)
            return;
  
        setLoading(true);
        alert.open("WARNING",{
            message: "Atualizando pedido..."
        })
        const res:any = await api.put("/orders/"+data.id+"/status/CFM");
        // alert.open("SUCCESS",{
        //     message: "Pedido atualizado com sucesso!"
        // })
        setLoading(false);
        updateOrder(res.data)
        setOrder((state:any) => ({...state,...res.data}));
    }
  
    const handleOnReject = async () => {
      if(loading)
          return;
  
      setLoading(true);
      alert.open("WARNING",{
          message: "Atualizando pedido..."
      })
      const res:any = await api.put("/orders/"+data.id+"/status/CAN");
    //   alert.open("SUCCESS",{
    //       message: "Pedido atualizado com sucesso!"
    //   })
      setLoading(false);
      updateOrder(res.data)
  }

 

  return <Container className={data.status !== "PDG" ? "finished" : ""}>
    <div className={`background ${!["PDG","CAN"].includes(data.status) ? "success" : (data.status === "CAN" ? 'failed' : "")}`}>
        {/* <div className='circle'/>
        <div style={{animationDelay: '1s'}} className='circle'/>
        <div style={{animationDelay: '2s'}} className='circle'/> */}
    </div>

    <div className='content'>
        <div className="header">
            {/* <Heading align="center" title={`Pedido #${data.ref.toString()}`} bold size={2}/> */}
            {/* {data && data.status !== "PDG" && <StatusProgress data={data} /> } */}
            {data && data.status === "PDG" && <Heading align="center" title="Aceite ou recuse este pedido" bold size={4}/> }
        </div>
        {data.status === "PDG" && <div className={"buttons "+(loading ? "loading": "")}>
            <div className='reject' onClick={handleOnReject}>
                <div className='circle'>
                <Icon color={colors.background} name="close" size={32}/>
                </div>
                <Heading align="center" title="Rejeitar" bold size={4}/>
            </div>
            {loading && <div className={'loading '+(data.status === "ACCEPT" ? 'fromaccept' : 'fromreject')}>
                <div className='circle'>
                {/* <Icon color={colors.background} name="info" size={32}/> */}
                </div>
                {/* <Heading align="center" title="Carregando..." bold size={4}/> */}
            </div>}
            <div className='accept'  onClick={handleOnAccept}>
                <div className='circle'>
                <Icon color={colors.background} name="check" size={32}/>
                </div>
                <Heading align="center" title="Aceitar" bold size={4}/>
            </div>
        </div> }
        
        {data.status === "PDG" && <div className="footer" onClick={() => {
          let el = document.getElementById("content")

          if(el)
            el.scrollTo(0,window.innerHeight)
        }}>
            <Heading align="center" title="Ver detalhes" bold size={4}/>
            <Icon name="arrow-down" size={32}/>
        </div> }
    </div>

    </Container>;
}

export default OrderHeaderSession;