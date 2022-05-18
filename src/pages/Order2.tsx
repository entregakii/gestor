import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DELIVERY from '../assets/DELIVERY.png';
import INDOOR from '../assets/INDOOR.png';
import PICKUP from '../assets/PICKUP.png';
import OrderSlider from '../components/OrderSlider';
import { colors } from '../config';
import { useApi } from '../contexts/main';
import { useOrdersDispatch } from '../contexts/orders';
import Button from '../elements/Button';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import { useAlert } from '../hooks/alert';
import { decimalToMoney, formatTimeWithExtension } from '../services/functions';



const imagems:any = {
    DELIVERY,PICKUP,INDOOR
}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    height: 100%;
  
 
    > .top{
     
        overflow: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        > .card {
            background-color: ${colors.gray100};
            display: flex;
            border-radius: 10px;
            padding: 10px;
            max-width: 500px;
            width: 100%;

            >.info {
                padding: 20px;
            }

            > img {
                width: 100px;
            }
        }

        > .info {

            max-width: 500px;
            width: 100%;
            padding-bottom: 40px;

            

            > .box {
                display: flex;
                margin-top: 30px;

                .icon{
                    padding: 0 10px;
                }
            }

        }

    }

    > .bottom {
        padding: 20px
    }

`;


const Details = styled.div`

    width: 100%;
    display: flex;

    > .left {

        padding-left: 20px;

        .picture {
            width: 50px;
            height: 50px;
            background-color: ${colors.background_secondary};
            border-radius: 25px;
        }
    }

    > .right {
        padding: 0px 20px;
        width: 100%;

        > .chatbox{

            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 10px;
            position: relative;
            margin-top: 10px;

            &.first:after {
                width: 20px;
                height: 20px;
                background-color: #f5f5f5;
                content: "";
                position: absolute;
                top: 15px;
                left: -7px;
                border-radius: 5px;
                transform: rotate(45deg);
                display: block;
            }

            > .item {
        
                padding: 10px;
                width: 100%;
                
                &:not(:first-child){
                    border-top: 1px solid ${colors.background_secondary};
                }
                //::afterbox-shadow: 2px 2px 10px #0001;
              
                display: flex;
              

                .qty {
                    font-family: Whitney Bold;
                    padding-right: 10px;
                    color: ${colors.subtitle};
                }
                .name {
                    font-family: Whitney Bold;
                    flex: 1;
                }
                .price {
                    font-family: Whitney Bold;
                    padding-left: 10px;
                    color: ${colors.subtitle};
                }

                position: relative;


            }

            > .total {
                padding: 10px;
                //::afterbox-shadow: 2px 2px 10px #0001;
                display: flex;

            
                .name {
                    font-family: Whitney Bold;
                    font-size: 1.25rem;
                }
                .price {
                    font-family: Whitney Bold;
                    padding-left: 10px;
                    color: ${colors.subtitle};
                    font-size: 1.25rem;
                }


            }

        }

        

       
    }
`

const deliveryTypes:any = {
    "INDOOR": "Na mesa",
    "DELIVERY": "Entrega",
    "PICKUP": "Retirar no local"
}

const orderStatus:any = {
    "PDG": "Pendente",
    "CFM": "Preparando",
    "DSP": "Entregando",
    "RTP": "Pronto para retirar",
    "CON": "Concluído",
    "CAN": "Cancelado",
}


const orderStatusButton:any = {
    "DSP": "Despachar para entrega",
    "RTP": "Pronto para cliente retirar",
    "CON": "Concluir",
}

const orderStatusColor:any = {
    "PDG": colors.error,
    "CFM": colors.orange400,
    "DSP": colors.success,
    "RTP": colors.success,
    "CON": colors.success,
    "CAN": colors.error,
}

const nextStep = (order:any) => {

    const {status,type} = order

    if(status === "PDG")
        return "CFM"

    else if(status === "CFM" && type === "DELIVERY")
        return "DSP"

    else if(status === "CFM" && type === "PICKUP" ) 
        return "RTP"

    else if(status === "CFM" && type === "INDOOR") 
        return"DSP"

    else if((status === "DSP" || status === "RTP"))
        return "CON"

    else 
        return ""
}

const OrderPage = ({data}:any) => {

    const [order,setOrder] = useState<any>();
    const [loading,setLoading] = useState(false);
    const alert = useAlert();
    const api = useApi();

    const {updateOrder} = useOrdersDispatch()

    const getOrder = async () => {
        const res:any = await api.get("orders/"+data.id);
        setOrder(res.data);
    }

    const handleOnAccept = async () => {
        if(loading)
            return;

        setLoading(true);
        alert.open("WARNING",{
            message: "Atualizando pedido..."
        })
        const res:any = await api.put("/orders/"+data.id+"/status/"+nextStep(order));
        alert.open("SUCCESS",{
            message: "Pedido atualizado com sucesso!"
        })
        setLoading(false);
        updateOrder(res.data)
        setOrder({...order,...res.data});
    }

    const handleOnReject = async () => {
        if(loading)
            return;

        setLoading(true);
        alert.open("WARNING",{
            message: "Atualizando pedido..."
        })
        const res:any = await api.put("/orders/"+data.id+"/status/CAN");
        alert.open("SUCCESS",{
            message: "Pedido atualizado com sucesso!"
        })
        setLoading(false);
        updateOrder(res.data)
    }

    useEffect(() => {
        setOrder(undefined)
        getOrder();
    },[data.id])

     

    if(!order)
        return <div>   <Heading title={`Carregando...`} bold align="center" size={1}/></div>;

  return <Container>
  
        <div className="top">

            <Heading title={`Pedido #${data.ref.toString()}`} bold align="center" size={1}/>
            <Heading title={`${orderStatus[data.status]}`} color={orderStatusColor[data.status]} bold align="center" size={3}/>

           

            <div className="card" style={{marginTop: 20}}>
                <img src={imagems[order.deliveryMethod]}/>
                <div className='info'>
                    <Heading title={deliveryTypes[order.deliveryMethod]} bold size={1}/>
                    { order.deliveryMethod === "DELIVERY" && <Heading title={`Entregar em ${order.custumer && order.custumer.address}`} bold size={4}/>}
                    { order.deliveryMethod === "PICKUP" && <Heading title="Aguarde o cliente vir buscar o pedido" bold size={4}/>}
                    { order.deliveryMethod === "INDOOR" && <Heading title={"O cliente está na(o): "+order.custumer.table} bold size={4}/>}
                    
                </div>
            </div>

            <div className='info'>

                <div className="box">
                <div className="icon">
                    {/* <Icon name="da" size={32} color={colors.logo_color}/> */}
                </div>
                <div className="title">
                    <Heading title={`Pedido feito ${formatTimeWithExtension(data.orderedDateTime)}`} bold size={6}/>
                    <Heading title={`Entrega Prevista para ${formatTimeWithExtension(data.estimatedMinDateTime)}`} bold size={4}/>           
                </div>
                <div className="right"></div>
            </div>

            <div className="box">
                <div className="icon">
                    <Icon name="user" size={32} color={colors.logo_color}/>
                </div>
                <div className="title">
                    <Heading title={`NOVO CLIENTE`} bold size={6} color={colors.subtitle}/>
                    <Heading title={`Primeiro pedido feito na sua loja`} bold size={4}/>
                </div>
                <div className="right"></div>
            </div>

            {/* <div className="box">
                <div className="icon">
                    <Icon name="map" size={32} color={colors.logo_color}/>
                </div>
                <div className="title">
                    <Heading title={`DELIVERY`} bold size={6} color={colors.subtitle}/>
                    <Heading title={`Entregar em ${order.custumer && order.custumer.address}`} bold size={4}/>
                </div>
                <div className="right"></div>
            </div> */}

        </div>

        <Details>
        <div className="left">
            <div className="picture"/>
        </div>
        <div className="right">
            {/* { !!order.user && <>{ order.status !== "PDG" */}
            { !!order.user && <>{ true
            ? <Heading title={order.user.name || order.user.phone} bold size={4}/>
            : <Heading title={"Cliente anônimo • Aceite para vizualizar"} color={colors.error} bold size={4}/>
            }</> }

            <div className="chatbox first">
            {
                order.items.map((item:any) => (
                    <div className="item">
                        <div className="qty">{item.quantity}x</div>
                        <div className="name">{item.name}</div>
                        <div className="price">{decimalToMoney(item.total)}</div>
                    </div>
                ))
            }
            </div>

            <div className="chatbox">

                <div className="total">
                    <div className="name">Taxa de entrega</div>
                    <div className="price">{decimalToMoney(order.details.deliveryFee)}</div>
                </div>

                <div className="total">
                    <div className="name">Total</div>
                    <div className="price">{decimalToMoney(order.total)}</div>
                </div>

            </div>

            <div className="chatbox">

                <div className="total">
                    <div className="name">método de pagamento</div>
                    <div className="price">{order.payment}</div>
                </div>

            </div>

        </div>
    </Details>

        </div>
        <div className="bottom">
            { order.status === "PDG" ? <OrderSlider onAccept={handleOnAccept} onReject={handleOnReject}/>
            : <div style={{display: 'flex'}}>
                <Button onClick={handleOnReject} variant="contained" color={colors.error} title="Cancelar Pedido"/>
                <div style={{width: 10}}/>
                <Button onClick={handleOnAccept} variant="contained" color={orderStatusColor[nextStep(order)]} title={orderStatusButton[nextStep(order)]}/>
                <div style={{width: 10}}/>
                {/* <Button variant="contained" title="Imprimir"/> */}
            </div>}
        </div>

  </Container>
  

}

export default OrderPage;