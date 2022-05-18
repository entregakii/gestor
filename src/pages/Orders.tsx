import styled from 'styled-components';
import NOORDERS from '../assets/illustrations/NOORDERS.png';
import SELECTORDER from '../assets/illustrations/SELECTORDER.png';
import Illustration from '../components/Illustration';
import { colors } from '../config';
import { useOrders } from '../contexts/orders';
import OrderPage from './Order';


export const Container = styled.div`

    display: flex;
    overflow: hidden;
    height: 100%;

    > .content{

        overflow: auto;
        background-color: ${colors.gray100};
        width: 100%;

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
                display: flex;
                overflow-x: auto;
         

                > .link{

                    margin-right: 12px;
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

    }

    > .left{
       
    }

    @media(max-width: 800px){
        .left{
            display: none;
        }
    }

    > .right{

        flex: 1;
        display: flex;
        flex-direction: column;
        

       > .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: auto;
            flex: 1;
           

            > .content{
                /* padding: 20px; */
                /* max-width: 900px; */
                width: 100%;
                height: 100%;
             
            }
       }
    }

`;

const OrdersPage = ({match}:any) => {

    const {id} = match.params
    const orders = useOrders();

 
    const order = orders.find(o => o.ref === id)

    // const {setFilter} = useOrdersDispatch();
    
    const data = {
        PDG: orders.filter(o => o.status === "PDG"),
        CFM: orders.filter(o => o.status === "CFM"),
        DSP: orders.filter(o => o.status === "DSP"),
        RTP: orders.filter(o => o.status === "RTP"),
        CON: orders.filter(o => o.status === "CON")
    }


    if(orders.length === 0)
        return <Illustration src={NOORDERS} title="Nenhum pedido no momento" description="Assim que um pedido for efetuado ele aparecerá aqui."/> 

  
    if(order)
        return <OrderPage data={order}/>
    else
        return <Illustration src={SELECTORDER} title="Selecione um pedido" description="Clique em um pedido para vizualizar todos os seus detalhes"/> 

//   return <Container>
//       <div className="content">

//         { data.PDG.length > 0 && <div className="group">
//             <div className="header">
//                 <div className="title">
//                     <Icon name="arrow-right"/>
//                     Pendentes 
//                 </div> 
//                 <div className="qty">{data.PDG.length}</div> 
//             </div>
//             <div className="content">
//                 {
//                     data.PDG.map((o) => (
//                         <OrderCard data={o} to={"/pedidos/"+o.ref.toString().toString()}/>
//                     ))
//                 }
//             </div>
//         </div> }

//         { data.CFM.length > 0 && <div className="group">
//             <div className="header">
//                 <div className="title">
//                     <Icon name="arrow-right"/>
//                     Preparando
//                 </div> 
//                 <div className="qty">{data.CFM.length}</div> 
//             </div>
//             <div className="content">
//                 {
//                     data.CFM.map((o) => (
//                         <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
//                     ))
//                 }
//             </div>
//         </div> }

//         { data.DSP.length > 0 && <div className="group">
//             <div className="header">
//                 <div className="title">
//                     <Icon name="arrow-right"/>
//                     Entregando 
//                 </div> 
//                 <div className="qty">{data.DSP.length}</div> 
//             </div>
//             <div className="content">
//                 {
//                     data.DSP.map((o) => (
//                         <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
//                     ))
//                 }
//             </div>
//         </div> }

//         { data.RTP.length > 0 && <div className="group">
//             <div className="header">
//                 <div className="title">
//                     <Icon name="arrow-right"/>
//                     Aguardando cliente 
//                 </div> 
//                 <div className="qty">{data.RTP.length}</div> 
//             </div>
//             <div className="content">
//                 {
//                     data.RTP.map((o) => (
//                         <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
//                     ))
//                 }
//             </div>
//         </div> }


//         { data.CON.length > 0 && <div className="group">
//             <div className="header">
//                 <div className="title">
//                     <Icon name="arrow-right"/>
//                     Concluídos recentemente
//                 </div> 
//                 <div className="qty">{data.CON.length}</div> 
//             </div>
//             <div className="content">
//                 {
//                     data.CON.map((o) => (
//                         <OrderCard data={o} to={"/pedidos/"+o.ref.toString()}/>
//                     ))
//                 }
//             </div>
//         </div> }

//       </div>
//   </Container>
 }


export default OrdersPage;