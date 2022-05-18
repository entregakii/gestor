import styled from 'styled-components';
import DeliveriesNavigator from '../components/DeliveriesNavigator';
import OrdersNavigator from '../components/OrdersNavigator';
import { useOrders } from '../contexts/orders';
import OrderPage from './Order';

export const Container = styled.div`

    display: flex;
    overflow: hidden;
    height: 100vh;

    > .left{
       
    }

    > .right{
        flex: 1;
        display: flex;
        justify-content: center;
        overflow-y: auto;

        > .content{
            padding: 20px;
            max-width: 900px;
            width: 100%;
        }
    }

`;

const DeliveriesPage = ({match}:any) => {

    const {id} = match.params
    const orders = useOrders();
 
    const order = orders.find(o => o.ref === id)

  return <Container>
      <div className="left">
          <DeliveriesNavigator/>
      </div>
      <div className="right">
          <div className="content">
            { order && <OrderPage data={order}/> }
          </div>  
      </div>
  </Container>
}

export default DeliveriesPage;