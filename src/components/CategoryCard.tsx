import React, { useState } from 'react';

import styled from 'styled-components';
import { colors } from '../config';
import { useDispatch } from '../contexts/main';
import Icon from '../elements/Icon';
import ProductCard from './ProductCard';

export const Container = styled.div`

    border-radius: 10px;
    margin-top: 10px;
    border: 1px solid ${colors.background_secondary};
    overflow: hidden;

    &.opacity{
        opacity: 0.3;
    }

    >.header{
        cursor: pointer;
        display: flex;
        background-color: ${colors.gray100};
        padding: 15px;
        border-radius: 10px 10px 0px 0px;
        align-items: center;

       > .left {
            font-family: Whitney Bold;
            flex: 1;
       }
       > .right{

        .btn {
            transition: 200ms;
        }

           cursor: pointer;
           display: flex;
           font-family: Whitney Bold;
           align-items: center;
       }
    }
`;


const CategoryCard = ({data,filter}:any) => {

    //const [hide,setHide] = useState(false);
    const {toggleCategory} = useDispatch();

    console.log(data.name,data.hide)

    const products = data.products.filter((p:any) => p.name.toLowerCase().includes(filter) || p.description.toLowerCase().includes(filter))

  return <Container  className={products.length === 0 ? "opacity" : ""}>
      <div className="header" onClick={() => toggleCategory(data)}>
          <div className="left">{data.name}</div>
          {products.length > 0 && <div className="right">
              <div className="btn"  style={{transform: data.hide ? 'rotate(0deg)':'rotate(90deg)'}}>
                <Icon name="arrow-right"/>
              </div>
          </div> }
      </div>
      <div className="content">
            { data.hide && products.map((product:any) => (
                <ProductCard data={product}/>
            ))}
      </div>
  </Container>;
}

export default CategoryCard;