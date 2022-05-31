import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryCard from '../components/CategoryCard';
import DeliveriesNavigator from '../components/DeliveriesNavigator';
import OrdersNavigator from '../components/OrdersNavigator';
import { useApi, useDispatch, useSelector } from '../contexts/main';
import { useOrders } from '../contexts/orders';
import Heading from '../elements/Heading';
import Loading from '../elements/Loading';
import TextInput from '../elements/TextInput';
import OrderPage from './Order';

export const Container = styled.div`

  display: flex;
  overflow: hidden;
  height: 100vh;
  flex: 1;
  justify-content: center;
  overflow: auto;

  > .content{
      padding: 20px;
      max-width: 900px;
      width: 100%;
  }
    
`;

const CatalogPage = ({match}:any) => {

  const catalog = useSelector(state => state.catalog)
  const {setCatalog} = useDispatch();
  const [filter,setFilter] = useState("");
  const [loading,setLoading] = useState(false);

  const api = useApi();

  const get = async () => {
    setLoading(true)
    const {data}:any = await api.get("/merchant/products")
    setLoading(false)
    setCatalog(data)
  }

  useEffect(() => {
    get()
  },[])

  if(loading)
    return  <Loading/>

  return <Container>

    <div className="content">

      <Heading title="Catalogo" bold size={1} align="left"/>
      <Heading title="Pause ou ative rapidamente os itens dos cardapios aqui!" size={4} align="left"/>
      <TextInput title="Filtrar produto" value={filter} onInput={setFilter}/>

      {catalog.map(category => (
        <CategoryCard data={category} filter={filter}/>
      ))  }

    </div>

  </Container>

}

export default CatalogPage;