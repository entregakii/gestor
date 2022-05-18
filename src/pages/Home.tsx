import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Clock from '../components/Clock';
import DeliveriesNavigator from '../components/DeliveriesNavigator';
import OrdersNavigator from '../components/OrdersNavigator';
import config, { colors } from '../config';
import { useApi, useSelector } from '../contexts/main';
import { useOrders } from '../contexts/orders';
import Heading from '../elements/Heading';
import Loading from '../elements/Loading';
import { decimalToHour, decimalToMoney, toWeekDay } from '../services/functions';
import OrderPage from './Order';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  

  .content {
   
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .picture{
    width: 200px;
    height: 200px;
  }
`;

const HomePage = ({match}:any) => {

  const {merchant,user} = useSelector(state => state)
  const api = useApi();
  const [data,setData] = useState<any>();

  const get = async () => {
    
    const res:any = await api.get("/merchant/home")
   
    setData(res.data)
  }

    useEffect(() => {
      get()
    },[])

    var schedules:any = [];

    if(merchant){
        ["DOM","SEG","TER","QUA","QUI","SEX","SAB"].map(weekday => {
            let filter = merchant.schedules.filter((sch:any) => sch.weekDay=== weekday);
            if(filter.length >0)
              schedules.push({
                weekDay: weekday,
                schedules: filter
              })
        })
    }

    if(!data)
      return  <Loading/>


      const makeWidget1 = () => (
        <GridItem rows={2}>
            <Heading size={4} color={colors.gray500} title="Horários de funcionamento"/>
            <div style={{display: 'flex',flex: 1,flexDirection: 'column',overflow: 'auto'}}>
                {schedules.map((sch:any) => (
                  <div style={{background: "#fff",borderRadius: 10,margin: "5px 0",padding: 10}}>
                    <Heading size={4} bold title={toWeekDay(sch.weekDay)}/>
                    {
                      sch.schedules.map((s:any) => (
                        <Heading size={5} color={colors.gray500} title={`${decimalToHour(s.startTime)} - ${decimalToHour(s.endTime)}`}/>
                      ))
                    }
                  </div>
                ))}
            </div>
        </GridItem>
      )

    const makeWidget2 = ({enableds,disableds}:any) => (
      <GridItem>
        <Heading size={4} color={colors.gray500} title="Items do catalogo"/>
        <div style={{display: 'flex',flex: 1}}>
          <div style={{display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
            <Heading size={1} bold color={colors.gray500} title={enableds}/>
            <Heading size={4} color={colors.gray500} title="Ativos"/>
          </div>
          <div style={{display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
            <Heading size={1} bold color={colors.gray500} title={disableds}/>
            <Heading size={4} color={colors.gray500} title="Pausados"/>
          </div>
        </div>
      </GridItem>
    )

    const makeWidget4 = ({first,second,third}:any) => (
      <GridItem columns={2}>
        <Heading size={4} color={colors.gray500} title="Pedidos concluídos"/>
        <div style={{display: 'flex',flex: 1}}>
            <div style={{display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
              <Heading size={1} bold color={colors.gray500} title={first}/>
              <Heading align="center" size={4} color={colors.gray500} title="Ultimas 24h"/>
            </div>
            <div style={{display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
              <Heading size={1} bold color={colors.gray500} title={second}/>
              <Heading align="center" size={4} color={colors.gray500} title="Ultima semana"/>
            </div>
            <div style={{display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
              <Heading size={1} bold color={colors.gray500} title={decimalToMoney(third)}/>
              <Heading align="center" size={4} color={colors.gray500} title="Ticket Médio"/>
            </div>
        </div>
      </GridItem>
    )

    // const makeWidget5 = ({first,second,third}:any) => (
    //   <GridItem>
    //     <Heading size={4} color={colors.gray500} title="Avaliações"/>
    //     <div style={{display: 'flex',flex: 1}}>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={first || 0}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Hoje"/>
    //         </div>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={second || 0}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Essa semana"/>
    //         </div>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={third || 0}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Esse mês"/>
    //         </div>
    //     </div>
    //   </GridItem>
    // )

    // const makeWidget6 = (ranking:any[]) => {

    //   let first = ranking[0];
    //   let second = ranking[1];
    //   let third = ranking[2];
    //   let restRanking = ranking.slice(3)

    //   return (
    //   <GridItem rows={2}>
    //     <Heading size={4} color={colors.gray500} title="Top 10 mais pedidos no mês"/>
    //     <div style={{padding: '10px 0'}}>
    //       {!!first && <div style={{display: 'flex',flex: 1,paddingBottom: 10}}>
    //           <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //             <Heading size={1} bold color={colors.gray500} title="1º"/>
    //             <Heading align="center" size={5} color={colors.gray500} title={first.name+` (${first.orderItems}x)`}/>
    //           </div>
    //       </div> }
    //       {!!second && <div style={{display: 'flex',flex: 1}}>
    //           <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title="2º"/>
    //             <Heading align="center" size={5} color={colors.gray500} title={second.name+` (${second.orderItems}x)`}/>
    //           </div>

    //           {!!third && <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //             <Heading size={1} bold color={colors.gray500} title="3º"/>
    //             <Heading align="center" size={5} color={colors.gray500} title={third.name+` (${third.orderItems}x)`}/>
    //           </div> }
              
    //       </div>}
    //     </div>
    //     {restRanking.length > 0 && <div style={{flex: 1}}>
    //       <div style={{display: 'flex',height: '100%',flexDirection:'column',flex: 1}}>

    //           {restRanking.map((r,i) => (
    //               <div style={{display: 'flex',alignItems:'center',flex: 1}}>
    //                 <Heading size={4} bold color={colors.gray500} title={(i+4)+"º &nbsp;"}/>
    //                 <Heading align="center" size={5} color={colors.gray500} title={r.name+`( ${r.orderItems}x)`}/>
    //               </div>
    //           ))}
              

    //       </div>
    //     </div>}
    //   </GridItem>
    // )}

    const makeWidget9 = (ranking:any[]) => {

        return (
        <GridItem>
          <Heading size={4} color={colors.gray500} title="Top 3 mais pedidos na semana"/>
         
          <div style={{flex: 1}}>
            <div style={{display: 'flex',paddingTop: 20,flexDirection:'column'}}>

                {ranking.map((r,i) => (
                    <div style={{display: 'flex',padding: "8px 0",alignItems:'center',flex: 1}}>
                      <div style={{paddingRight: 5}}><Heading size={4} bold color={colors.gray500} title={(i+1)+`º `}/></div>
                      <Heading align="center" size={5} color={colors.gray500} title={r.name+`( ${r.orderItems}x)`}/>
                    </div>
                ))}
                

            </div>
          </div>
        </GridItem>
    )}

    // const makeWidget7 = ({cfm = 0,dsp = 0,rtp = 0}:any) => (
    //   <GridItem>
    //     <Heading size={4} color={colors.gray500} title="Pedidos em andamento"/>
    //     <div style={{display: 'flex',flex: 1}}>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={cfm + dsp + rtp}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Pedidos ativos"/>
    //         </div>
    //       </div>
    //     <div style={{display: 'flex',flex: 1}}>
    //         {/* <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={2}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Pendentes"/>
    //         </div> */}
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'flex-start',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={cfm}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Preparando"/>
    //         </div>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'flex-start',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={dsp}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Entregando"/>
    //         </div>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'flex-start',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={rtp}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Aguardando cliente"/>
    //         </div>
    //     </div>
    //   </GridItem>
    // )

    // const makeWidget8 = ({first,second,third}:any) => (
    //   <GridItem columns={2}>
    //     <Heading size={4} color={colors.gray500} title="Ticket Médio"/>
    //     <div style={{display: 'flex',flex: 1}}>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={decimalToMoney(first)}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Ultimos 12 meses"/>
    //         </div>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={decimalToMoney(second)}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Ultimos 3 meses"/>
    //         </div>
    //         <div style={{display: 'flex',flex: '1 1',alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
    //           <Heading size={1} bold color={colors.gray500} title={decimalToMoney(third)}/>
    //           <Heading align="center" size={5} color={colors.gray500} title="Ultimo mês"/>
    //         </div>
    //     </div>
    //   </GridItem>
    // )



  return <Container>
      <div className="content">
          {/* <img src={config.url.merchantsImagens+merchant?.picture} className="picture"/> 
          <Heading size={1} title={merchant?.name} bold/>
          <Clock fontSize={"6vw"}/> */}
          <div style={{padding: 20,width: '100%'}} >
              <Heading size={2} bold color={colors.gray500} title={`👋 Olá, ${user?.name}`}/>
          </div>

          <Grid>
          
            {makeWidget1()}

            {makeWidget9(data.widget9)}

            {makeWidget2(data.widget2)}

            {/* <GridItem columns={2}>

              <Heading size={4} color={colors.gray500} title="Histórico de pedidos"/>

                <div style={{display: 'flex',flex: 1,padding: '20px 0'}}>
                    <div style={{maxWidth: 300,margin: '0 5px',backgroundColor: colors.background,borderRadius: 10,display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
                      <Heading size={3} bold color={colors.gray500} title="Terças"/>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Pedidos"/>
                        <Heading size={4} bold color={colors.gray700} title="12"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Atrasos"/>
                        <Heading size={4}  color={colors.gray500} title="10%"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Cancelados"/>
                        <Heading size={4}  color={colors.gray500} title="0%"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Availiações"/>
                        <Heading size={4}  color={colors.gray500} title="100%"/>
                      </div>
                    </div>

                    <div style={{maxWidth: 200,margin: '0 5px',backgroundColor: colors.background,borderRadius: 10,display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
                      <Heading size={3} bold color={colors.gray500} title="Quartas"/>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Pedidos"/>
                        <Heading size={4} bold color={colors.gray700} title="12"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Atrasos"/>
                        <Heading size={4}  color={colors.gray500} title="10%"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Cancelados"/>
                        <Heading size={4}  color={colors.gray500} title="0%"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Availiações"/>
                        <Heading size={4}  color={colors.gray500} title="100%"/>
                      </div>
                    </div>

                    <div style={{maxWidth: 200,margin: '0 5px',backgroundColor: colors.background,borderRadius: 10,display: 'flex',flex: 1,alignItems: 'center',justifyContent:'center',flexDirection: 'column'}}>
                      <Heading size={3} bold color={colors.gray500} title="Quintas"/>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Pedidos"/>
                        <Heading size={4} bold color={colors.gray700} title="12"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Atrasos"/>
                        <Heading size={4}  color={colors.gray500} title="10%"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Cancelados"/>
                        <Heading size={4}  color={colors.gray500} title="0%"/>
                      </div>
                      <div style={{display: 'flex',width: '100%',padding: '0 10px',justifyContent: 'space-between'}}>
                        <Heading size={4} color={colors.gray500} title="Availiações"/>
                        <Heading size={4}  color={colors.gray500} title="100%"/>
                      </div>
                    </div>
                    
                </div>
            </GridItem> */}
            
            {makeWidget4(data.widget4)}

            {/* {makeWidget5(data.widget5)} */}
        
            
            {/* {makeWidget7(data.widget7)} */}

            {/* {makeWidget8(data.widget8)} */}


          </Grid>
      </div>
  </Container>

}


 const GridContainer = styled.div`
   width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 300px);
    grid-gap: 10px;
    grid-auto-rows: 250px;
    
    .gridItem {
      .flex{
      
        display: flex;
        flex-direction: column;
      
        height: 100%;
      }
      padding: 20px;
      background-color: ${colors.gray50};
      border-radius: 10px;
    }
`;

const GridItem = ({columns = 1,rows = 1,children}:any) => {
  return <div className='gridItem' style={{gridColumn: `span ${columns}`,gridRow: `span ${rows}`}}>
      <div className='flex'>
        {children}
      </div>
  </div>
}


const Grid = ({children}:any) => {
  return <GridContainer>
      {children}
  </GridContainer>
}

export default HomePage;