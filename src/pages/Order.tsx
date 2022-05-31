import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
// import { Container } from './styles';
import styled from 'styled-components';
import { setTimeout } from 'timers';
import useSound from 'use-sound';
import ALERT from '../assets/alert.mp3'
import CANCELED from '../assets/illustrations/CANCELED.png';
import CONCLUDED from '../assets/illustrations/CONCLUDED.png';
import Illustration from '../components/Illustration';
import OrderHeaderSession from '../components/OrderHeaderSession';
import OrderProgress from '../components/OrderProgress';
import StatusProgress from '../components/StatusProgress';
import config, { colors } from '../config';
import { useApi, useSelector } from '../contexts/main';
import { useOrdersDispatch } from '../contexts/orders';
import Button from '../elements/Button';
import Flex from '../elements/Flex';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import Image from '../elements/Imagem';
import Loading from '../elements/Loading';
import { useAlert } from '../hooks/alert';
import { usePrint } from '../hooks/usePrint';
import { decimalToMoney, formatDateTime, formatTimeWithExtension, toDeliveryType } from '../services/functions';



const Container = styled.div`
    position: absolute;
    z-index: 1000;
   // padding-top: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
   width: 100%;
   left: 0;
   bottom: 0;
   right: 0;
   top: 0;
   padding: 20px;

   overflow: hidden;

   > .background {
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: #0007;
      position: absolute;
   }

   > .subcontainer{

    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;

    .closeBtn {
        
      z-index: 1000;
        width: 48px;
        height: 48px;
        background-color: #ffffff;
        border-radius: 24px;
        margin: 5px 0;
        position: absolute;
        right: 24px;
        top: 24px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
        transition: 200ms;

        span {
          max-width: 0;
        //  display: none;
          overflow: hidden;
       
        }

       
    }

    > .buttons {

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      flex: 1;

      .btn {
        
          max-width: 48px;
          min-width: 48px;
          height: 48px;
          background-color: #ffffff;
          border-radius: 24px;
          margin: 5px 0;

          display: flex;
          justify-content: center;
          align-items: center;
          transition: 200ms;

          span {
            max-width: 0;
          //  display: none;
            overflow: hidden;
         
          }

          &:hover{

            max-width: 400px;
            padding: 0 10px;
            cursor: pointer;
            span {
              margin: 0px 10px;
              max-width: 200px;
              display: block;
              overflow: hidden;
            }
          }
      }

    }

   > .order{
     width: 100%;
      position: relative;
      background-color: #fff;
      border: 1px solid ${colors.background_secondary};
      border-radius: 12px;
      // padding-top: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 550px;
      overflow: hidden;

     
      > .content {
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px;
      
      }

    }
   }

   @media (max-width: 650px){
      padding: 20px;

      > .subcontainer{
        > .buttons {
          display: none
        }
      }
   }

`;


const Bottom = styled.div`
 //   height: 100vh;
    /* margin-top: 50px; */
    max-width: 600px;
      width: 100%;
      padding: 20px;
   

    .status {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 20px 0px 0px 0px;
      .box {
        background-color: ${colors.red100};
        max-width: 680px;
        width: 100%;
        border-radius: 10px;
        padding: 20px;
      }
    }

    .table{

      display: flex;
      padding: 20px 0;
      flex-direction: column;
      align-items: center;

      > .row{
       
        max-width: 680px;
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid ${colors.gray100};

     
        
        > .top {

          display: flex;
          align-items: center;

          > .quantity {
            padding-right: 10px;
          }
          > .name {
            flex :1;
          }
          > .total {
            padding-left: 10px;
          }

        }

        > .bottom {

          padding-top: 5px;

          > .subrow {
            padding: 5px;
            display: flex;
            align-items: center;

            .arrow{
              height: 20px;
              width: 10px;
              border: 1px solid transparent;
              border-left: 2px solid ${colors.gray200};
              border-bottom: 2px solid ${colors.gray200};
              //background: ${colors.gray500};
              border-radius: 0px 0px 0px 5px;
              margin-right: 5px;
              margin-top: -15px;
            }

            > .quantity {
              padding-right: 5px;
            }
            > .name {
              flex :1;
            }
            
          }
        }

      }

    }

`;


const OrderPage = ({data}:any) => {

    const [order,setOrder] = useState<any>();
    const [loading,setLoading] = useState(false);
    const {merchant} = useSelector(s=>s)
    const alert = useAlert();
    const api = useApi();
    const print = usePrint();

    const [play] = useSound(ALERT,{volume: 0.15});

    const printRef = useRef<any>(null);

    var features = [];

    const {updateOrder} = useOrdersDispatch();

    const toPrint = (order && order.status != "PDG" && order.user )? [
      {text: `Pedido #${order.ref}`,size: 3,align:"center"},
      {text: merchant.name,size: 4,align:"center"},
      {text: "** "+toDeliveryType(order.type)+" **",size: 6,align:"center"},
      {text: `Realizado: ${formatDateTime(order.orderedDateTime)}`,size: 5,align:"center"},
      {text: `Entregar até: ${formatDateTime(order.details.estimatedMaxDateTime)}`,size: 5,align:"center"},
      {separator: true},
      {text: `Cliente: ${order.user.name}`,size: 4,align: 'center'},
      {text: `Tel.: ${order.user.phone}${order.details.documentNumber ? ` | ${order.details.documentNumber.length <= 11 ? "CPF" : "CNPJ"}: `+order.details.documentNumber : ""}`,size: 6,align: 'center'},
      {separator: true},
      ...(order.details.table ? [
        {text: `Pedido na mesa: ${order.details.table}`,size: 4},
        {separator: true},
      ] : []),
      ...(order.details.address ? [
        {text: `Endereço para entrega`,size: 4,align:'center'},
        {text: order.details.address,size: 6,align:'center'},
        {separator: true},
      ] : []),
      {text: `Items do pedido`,size: 4,align:'center'},
      ...order.items.reduce((array:any,item:any) => ([
         ...array, 
         {text: ` ${item.qty}x ${item.name} (${decimalToMoney(item.total)})`,size: 5},
         ...item.options.map((opt:any) => ({
           text: ` ┗ ${opt.qty}x ${opt.name}`,size: 6
         })),
         ...(item.observations ? [{text: `  ✎ Obs: ${item.observations}`,size: 7}] : []),
        
      ]),[]),
      {separator: true},
      {text: `Subtotal: ${decimalToMoney(order.details.subtotal)}`,size: 6},
      {text: `taxa de entrega: ${decimalToMoney(order.details.deliveryFee)}`,size: 6},
      {text: `Desconto: ${decimalToMoney(order.details.discount)}`,size: 6},
      {text: `Total: ${decimalToMoney(order.total)}`,size: 4},
      {separator: true},
      {text: `Forma de pagamento`,size: 4},
      {text: `Tipo: ${order.payment.name}`,size: 6},
      {text: `${order.details.payment ? order.details.payment : ""}`,size: 6},
      {separator: true},
      {text: "Impresso por entregakii.com.br", size: 6,align:'flex-end'},
    ] : [];

    const handlePrint = () => {
      print.print([
        {text: `**** PEDIDO #${order.ref} ****`,size: 4,align:"center"},
        {},
        {text: texts[order.type],size: 4,align:"center"},
        {},
        {text: merchant.name,size: 4,align:"center"},
        {text: `Data do pedido: ${formatDateTime(order.orderedDateTime)}`,size: 4},
        {text: `Entrega prevista: ${formatDateTime(order.details.estimatedMaxDateTime)}`,size: 4},
        {text: `Cliente: ${order.user.name}`,size: 4},
        {text: `telefone: ${order.user.phone}`,size: 4},
        {text: `---------------`,size: 4,align:"center"},
        {text: `ITEMS DO PEDIDO`,size: 4},
        ...order.items.reduce((array:any,item:any) => ([
           ...array, 
           {text: ` ${item.qty}x ${item.name} (${decimalToMoney(item.total)})`,size: 4},
           item.options.map((opt:any) => ({
             text: ` +--- ${opt.qty}x ${opt.name}`,size: 4
           })),
           ...(item.observations ? [{text: `Obs: ${item.observations}`,size: 4}] : []),
           {text: `. . . . . . . .`,size: 4,align:"center"},
        ]),[]),
        {},
        {text: `---------------`,size: 4,align:"center"},
        {text: `TOTAL`,size: 5},
        {},
        {text: `Subtotal: ${decimalToMoney(order.details.subtotal)}`,size: 4},
        {text: `taxa de entrega: ${decimalToMoney(order.details.deliveryFee)}`,size: 4},
        {text: `Desconto: ${decimalToMoney(order.details.discount)}`,size: 4},
        {text: `Valor total: ${decimalToMoney(order.total)}`,size: 4},
        {},
        {text: `PAGAMENTO`,size: 5},
        {},
        {text: `Tipo: ${order.payment.name}`,size: 4},
        {text: `${order.details.payment}`,size: 4},
        {},
        {text: `INFORMAÇÕES ADICIONAIS`,size: 5},
        {text: `CPF/CNPJ na nota: ${order.details.documentNumber ? order.details.documentNumber : "-"}`,size: 4},
        {},
        ...(order.details.address ? [
          {text: `Endereço para entrega`,size: 4},
          {text: order.details.address,size: 4},
          {}
        ] : []),
        ...(order.details.table ? [
          {text: `Pedido na mesa: ${order.details.table}`,size: 4},
          {}
        ] : []),
        {text: `---------------`,size: 4,align:"center"},
        {text: "Impresso por entregakii", size: 4},
      ]
       )
    }

    const handleNextStep = async () => {

      if(loading)
          return;


      setLoading(true);
      alert.open("WARNING",{
          message: "Atualizando pedido..."
      })

      try {
     
        const res:any = await api.put("/orders/"+data.id+"/status/"+nextStep(data));
      
        play()
      

      // alert.open("SUCCESS",{
      //     message: "Pedido atualizado com sucesso!"
      // })

    
      updateOrder(res.data)
      setOrder((state:any) => ({...state,...res.data}));

    } catch (err:any) {
        if(err.response){
          if(err.response.status === 410){
            alert.open("ERROR",{message: "Este pedido foi expirado, motivo: Demorou muito para ser aceito."})
            getOrder();
          }
        }
    }

  setLoading(false);

    }

    const getOrder = async () => {
        const res:any = await api.get("orders/"+data.id);
        setOrder(res.data);
    }

    useEffect(() => {
      setOrder(undefined)
      getOrder();
  },[data.id])

  const [status,setStatus] = useState<any>(null)
  const [finish,setFinish] = useState<any>(null)

  let types:any = {
    "DELIVERY": "Delivery",
    "TAKEOUT": "Retirar no local",
    "INDOOR": "Na mesa"
  }
    
  let texts:any = {
    "PDG": "Pendente",
    "CFM": "Preparando",
    "RTP": "Aguardando cliente",
    "DSP": "Entregando",
    "CON": "Concluído",
    "CAN": "Cancelado"
}

    
  const nextStep = (order:any) => {

    const {status,type} = order

    console.log(status)

    if(status === "PDG")
        return "CFM"

    else if(status === "CFM" && type === "DELIVERY")
        return "DSP"

    else if(status === "CFM" && type === "TAKEOUT" ) 
        return "RTP"

    else if(status === "CFM" && type === "INDOOR") 
        return"DSP"

    else if((status === "DSP" || status === "RTP"))
        return "CON"

    else 
        return ""
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

  const handleAnswer = (answer:any) => {
    setStatus(answer)
    setTimeout(() => {
      if(answer === "ACCEPT")
        setFinish("SUCCESS")
      else
          setFinish("FAILED")

        setStatus(null)
    },1000)
  }


  let textStatus:any = {
    "PDG": "Pendente",
    "CFM": "Preparando",
    "RTP": "Aguardando cliente",
    "DSP": "Entregando",
    "CON": "Concluído",
    "CAN": "Cancelado"
}

let statusColors:any = {
  "PDG": colors.orange400,
  "CFM": colors.yellow400,
  "RTP": colors.green200,
  "DSP": colors.green200,
  "CON": colors.green400,
  "CAN": colors.red400
}

const getPageStyles = () => {
  return `@page {
    margin: 20mm 0 10mm 0;
  }
    page-break-before: always;
  }

  @media print 
{
    body {
        padding-top:2cm;
    }
}

 `
};

  console.log(order)

  var isFeating = status !== null; 
  var isFinished = !!finish

  useEffect(() => {
    setStatus(null)
    setFinish(null)
  },[data])

  if(data.status === "CON")
    return <Illustration src={CONCLUDED} title="Pedido concluído" description="Este pedido foi conclúido, você poderá ve-lo no portal do parceiro."/> 
  else if(data.status === "CAN")
    return <Illustration src={CANCELED} title="Pedido cancelado" description="Este pedido foi cancelado, você poderá ve-lo no portal do parceiro."/> 
  

  return <Container>

    <div className='subcontainer'>

      <Link to="/pedidos"><div className='closeBtn'>
        <Icon name="close"/>
      </div></Link>

      <div className='buttons' style={{alignItems: 'flex-end'}}>
          <div className='btn'>
              <span>
                <Heading title="Cancelar pedido" size={4} nowrap bold/>
              </span>
              <Icon name="cancel_order"/>
          </div>
          <ReactToPrint
            pageStyle={getPageStyles}
            trigger={() => <div className='btn'>
                <span>
                  <Heading  size={4} title="Imprimir" nowrap bold/>
                </span>
                <Icon name="printer"/>
            </div>}
            content={() => printRef.current}
          />
{/*          
         <Link to="/pedidos">
          <div className='btn'>
              <span>
                <Heading title="Fechar" nowrap bold/>
              </span>
              <Icon name="close"/>
          </div>
          </Link> */}
      </div>

      <div className='order'>

      <div className="content">
      
    
    { (!order) 
    ? <Loading/> 
    : <Bottom>
        
        <OrderProgress data={data} type="bar"/>
        {/* <StatusProgress data={data} /> */}


      <Flex marginHorizontal={20} direction="vertical" gap={5}>

          <Flex gap={10} >
              <Heading title={"Pedido #"+order.ref} size={4} color={colors.gray600} bold/>
              <Heading color={statusColors[order.status]} title={textStatus[order.status]} size={5} bold/>
          </Flex>

          <Heading title={`${formatTimeWithExtension(data.orderedDateTime)}`}size={4} color={colors.gray500}/>
          <Heading title={`Previsão de entrega: ${formatTimeWithExtension(data.details.estimatedMaxDateTime)}`}size={4} color={colors.gray500}/>

      </Flex>


      { data.status === "PDG" && <OrderHeaderSession setOrder={setOrder} data={order || data}/> }


      

      <div style={{display: 'none'}}>
        <div  ref={printRef} style={{width: '100%',display: 'flex',justifyContent:'center'}}>

        <style type="text/css" media="print">{getPageStyles()}</style>
        <div style={{maxWidth: '80mm',padding: '8mm'}}>
          {toPrint.map(line=>{

            if(line.separator)
              return <div style={{display: 'flex',alignItems: "center",padding: "2px 0",overflow: 'hidden'}}>
                <Heading title={[...new Array(50)].join("- ")} align="center" size={9} bold nowrap/>
            </div>
            
              else if(line.text)
                return <div style={{display: 'flex',justifyContent: line.align || "flex-start",padding: "2px 0"}}>
                  <Heading title={line.text} size={line.size+3} bold/>
              </div>
          })}
        </div>
        </div>
      </div>

  

      <Flex marginHorizontal={20} direction="vertical" gap={5}>

      
            <Heading title={"Efetuado por"} size={4} color={colors.gray600} bold/>
            { order.status !== "PDG" ? <>
            <Heading  title={order.user.name} size={4} color={colors.gray500}/>
            <Heading  title={"Telefone: "+order.user.phone} size={5} color={colors.gray500}/>
            { !!order.details.documentNumber && <Heading title={"CPF: "+order.details.documentNumber} size={5} color={colors.gray500}/>}
            </> :  <Heading title="Confirme para vizualizar" size={5} color={colors.red400}/> }


      </Flex>

    
      <Flex marginHorizontal={20} direction="vertical" gap={5}>

          <Heading title="Forma de pagamento" size={4} color={colors.gray600} bold/>
          { order.status === "PDG" ? <Heading title="Confirme para vizualizar a forma de pagamento" size={5} color={colors.red400}/>
          : <Flex gap={10}>
            <Flex gap={5}>
              <Image src={config.url.paymentMethodsImagens+order.payment.picture} width={25}/>
              <Heading title={order.payment.name} size={4} color={colors.gray500}/>
            </Flex>
            {!!order.details.moneyChange && <Heading title={order.details.moneyChange} size={5} color={colors.gray500}/> }
          </Flex>
      }

      </Flex>

      <Flex marginHorizontal={20} direction="vertical" gap={5}>
        <Heading title="Tipo de pedido" size={4} color={colors.gray600} bold/>
        <Heading title={types[order.type]} size={4} color={colors.gray500}/>
        {order.details.address && <Heading title={"Endereço para entrega: "+order.details.address} size={5} color={colors.gray500}/>}
        {order.details.table && <Heading title={"Mesa: "+order.details.table} size={5} color={colors.gray500}/>}
      </Flex>
      
      <Heading title="Detalhes" size={3} color={colors.gray500}/>
      <div className='table'>

        {order.items.map((item:any) => (
          <div className='row'>
            <div className='top'>
              <div className='quantity'><Heading size={5} title={(item.quantity || item.qty)+"x"} bold color={colors.gray500}/></div>
              <div className='name'><Heading size={4} title={item.name} bold/></div>
              <div className='total'><Heading size={5} title={decimalToMoney(item.total)} bold color={colors.gray500}/></div>
            </div>
            {
              item.options && <div className='bottom'>
                
                {
                item.options.map((opt:any) => (

                <div className='subrow'>
                  <div className='arrow'/>
                  {!!opt.qty && <div className='quantity'><Heading size={6} title={(opt.qty) + "x"} bold color={colors.gray500}/></div>}
                  <div className='name'><Heading size={5} title={opt.name} color={colors.gray600} bold/></div>
                </div>

              ))}

              </div> 
            }
          </div>

        ))}

        </div>

      
      <Flex marginHorizontal={10} justifyContent="space-between" >
          <Heading title={`${order.items.length} ite${order.items.length === 1 ? "m" : "ns"} | Subtotal:`} size={4} color={colors.gray600}/>
          <Heading title={decimalToMoney(order.details.subtotal)} size={4} color={colors.gray600}/>
      </Flex>

      <Flex  marginHorizontal={15} justifyContent="space-between" >
          <div>
              <Heading title="Taxa de entrega" size={4} color={colors.gray600}/>
              <Heading title={`Entregar até ${formatTimeWithExtension(data.details.estimatedMaxDateTime)}`} size={5} color={colors.gray400}/>
          </div>
          <Heading title={decimalToMoney(order.details.deliveryFee)}  size={4} color={colors.gray600}/>
      </Flex>

      <Flex  marginHorizontal={15} justifyContent="space-between" >
          <div>
              <Heading title="Cupom de desconto" size={4} color={colors.gray600}/>
              <Heading title={(order.coupon ? order.coupon.name : "Não está mais disponível")} size={5} color={colors.gray400}/>
          </div>
          <Heading title={"- "+decimalToMoney(order.details.discount)} size={4}  color={colors.gray600}/>
      </Flex>
    
      <Flex  marginHorizontal={15} justifyContent="space-between" >
          <Heading title="Total do pedido" size={4} color={colors.gray600} bold/>
          <Heading title={decimalToMoney(order.total)} bold  size={4} color={colors.gray600}/>
      </Flex>

      <div style={{height: 20}}/>

     <div className='max650'>
        <Flex  gap={10} marginHorizontal={20} >
              {data && data.status !== "CAN" && <Button variant="outline" color={colors.red400} onClick={handleOnReject} title={`Cancelar`}/> }
              
              {data && data.status === "PDG"
              ? <Button disabled={true} variant="outline" color={colors.gray700} onClick={handlePrint} title={`Imprimir`}/> 
              : <ReactToPrint
                    pageStyle={getPageStyles}
                    trigger={() => {
                      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                      // to the root node of the returned component as it will be overwritten.
                      return <Button disabled={false} variant="outline" color={colors.gray700} onClick={handlePrint} title={`Imprimir`}/> 
                    }}
                    content={() => printRef.current}
                  />
              }
              {data && data.status !== "PDG" && <Button variant="contained" onClick={handleNextStep} title={`Atualizar status: ${texts[nextStep(data)]}`}/> }
          </Flex>
        </div>


        
    </Bottom> }
    </div>
    </div>

    <div className='buttons' style={{alignItems: 'flex-start'}}>
        <div className='btn' onClick={handleNextStep}>
            <Icon name="arrow-right"/>
            <span>
                <Heading size={4} title="Avançar etapa" nowrap bold/>
                <Heading size={7} title={texts[nextStep(data)]} nowrap />
            </span>
        </div>
    </div>

   </div>

   <div className='background'/>

  </Container>;
}


export default OrderPage;