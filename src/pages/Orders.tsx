import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NOORDERS from '../assets/illustrations/NOORDERS.png';
import SELECTORDER from '../assets/illustrations/SELECTORDER.png';
import Illustration from '../components/Illustration';
import OrderCard from '../components/OrderCard';
import OrderCardSecondary from '../components/OrderCardSecondary';
import UserProfile from '../components/UserProfile';
import { colors } from '../config';
import { useSelector } from '../contexts/main';
import { useOrders } from '../contexts/orders';
import Button from '../elements/Button';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import TabIndex from '../elements/TabIndex';
import { useAlert } from '../hooks/alert';
import { checkIsOpen } from '../services/functions';
import OrderPage from './Order';


export const Container = styled.div`

    display: flex;
    //height: 100%;
    height: 100%;
    position: relative;

    > .left{
       
        flex: 1 1 635px;
        /* max-width: 635px; */
        padding: 20px 20px 0px 20px;
        overflow-x: hidden;
        height: 100%;

        .orders{
            padding:10px;
            width: 100%;
            height: 100%;
            /* overflow-x: auto; */
            display: flex;
            justify-content: center;
            .grid {
                display: grid;
                gap: 10px;
                grid-auto-rows: 250px;
                grid-template-columns: repeat(3,1fr);

                @media (max-width:510px){
     
                    grid-template-columns: repeat(2,1fr);
        
                }
            }
            /* display: flex; */
        }

      
    }

    > .right {
        /* margin-left: 28px; */
        padding-right: 20px;
        padding-top: 40px;
        width: 300px;

        > .content {
            position: sticky;
            top: 20px;
        }
    }

   

`;

const OrdersPage = ({match}:any) => {

    const {id} = match.params
    const orders = useOrders();
    const merchant = useSelector(s => s.merchant)
    const alert = useAlert();
    console.log(merchant)

 
    const order = orders.find(o => o.ref === id)

    // const {setFilter} = useOrdersDispatch();
    
    const data = {
        PDG:[ ...orders.filter(o => o.status === "PDG"), ...orders.filter(o => o.status === "PDG"), ...orders.filter(o => o.status === "PDG"), ...orders.filter(o => o.status === "PDG"), ...orders.filter(o => o.status === "PDG")],
        CFM: orders.filter(o => o.status === "CFM"),
        DSP: orders.filter(o => o.status === "DSP"),
        RTP: orders.filter(o => o.status === "RTP"),
        CON: orders.filter(o => o.status === "CON")
    }

    return <>
    {!!order && <OrderPage data={order}/>}
    <Container>



        <div className='left'>
            <TabIndex tabs={[
                {title: "Pendentes",icon: "stopwatch",notify: data.PDG.length},
                {title: "Preparando",icon: "bag",notify: data.CFM.length},
                {title: "Entregando",icon: "motocycle",notify: data.DSP.length},
                {title: "Aguardando cliente",icon: "walking",notify: data.RTP.length}
            ]}>
                <div className='orders'>
                    <div className='grid'>
                        {
                            data.PDG.map((data:any) => <OrderCard to={"/pedidos/"+data.ref} data={data}/>)
                        }
                    </div>
                    {data.PDG.length === 0 && <div style={{maxWidth: 500,justifyContent: 'center',flex: 1,display:"flex",flexDirection: 'column',alignItems:'center'}}>
                        <Heading align='center' size={4} bold title={checkIsOpen(merchant.schedules) ? "Seu estabelecimento está aberto e aguardando pedidos" : "Seu estabelecimento está fechado no momento"}/>
                        <Heading align='center' size={6} title="Não se esqueça de compartilhar o link da sua loja com seus clientes para receber pedidos."/>
                        <div style={{display: 'flex',padding: 12}}>
                            <Icon name="facebook"/>
                            <div style={{width: 10}}/>
                            <Icon name="instagram"/>
                            <div style={{width: 10}}/>
                            <Icon name="whatsapp"/>
                        </div>
                        <div style={{cursor: "pointer",borderRadius: 5,marginBottom: 10,border: "2px dashed "+colors.gray200,padding: "5px 15px"}} onClick={() => {
                            navigator.clipboard.writeText('https://www.entregakii.com.br/'+merchant.slug).then(function() {
                                alert.open("SUCCESS",{message: "Link copiado com sucesso!"})
                              }, function(err) {
                                alert.open("ERROR",{message: "Erro ao tentar copiar o link"})
                            });
                        }}>
                        <Heading align='center' color={colors.secondary} size={6} title={'https://www.entregakii.com.br/'+merchant.slug}/>
                        </div>
                        {/* <Button title='Copiar link' variant="outline" /> */}
                    </div>}
                </div>
                <div className='orders'>
                    <div className='grid'>
                        {
                            data.CFM.map((data:any) => <OrderCard to={"/pedidos/"+data.ref} data={data}/>)
                        }
                    </div>
                    {data.CFM.length === 0 && <Illustration src={NOORDERS} title="Nenhum pedido no momento" description=""/>}
                </div>
                <div className='orders'>
                    <div className='grid'>
                        {
                            data.DSP.map((data:any) => <OrderCard to={"/pedidos/"+data.ref} data={data}/>)
                        }
                    </div>
                    {data.DSP.length === 0 && <Illustration src={NOORDERS} title="Nenhum pedido no momento" description=""/>}
                </div>
                <div className='orders'>
                    <div className='grid'>
                        {
                            data.RTP.map((data:any) => <OrderCard to={"/pedidos/"+data.ref} data={data}/>)
                        }
                    </div>
                    {data.RTP.length === 0 && <Illustration src={NOORDERS} title="Nenhum pedido no momento" description=""/>}
                </div>
            
            </TabIndex>

         
            
        </div>

        <div className='right min850'>
            <div className='content'>
                <UserProfile/>
                {data.PDG.map((data) => <Link to={"/pedidos/"+data.ref}><OrderCardSecondary  to={"/pedidos/"+data.ref} data={data}/></Link>)}
            </div>
        </div>

    </Container>
    </>
    // if(orders.length === 0)
    //     return <Illustration src={NOORDERS} title="Nenhum pedido no momento" description="Assim que um pedido for efetuado ele aparecerá aqui."/> 

    // if(order)
    //     return <OrderPage data={order}/>
    // else
    //     return <Illustration src={SELECTORDER} title="Selecione um pedido" description="Clique em um pedido para vizualizar todos os seus detalhes"/> 

 }


export default OrdersPage;