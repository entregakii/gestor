import React from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import { useApi, useDispatch } from '../contexts/main';
import ActivateInput from '../elements/ActivateInput';
import { useAlert } from '../hooks/alert';
import { decimalToMoney } from '../services/functions';


export const Container = styled.div`

    padding: 10px 15px;
    border-top: 1px solid ${colors.background_secondary};

    > .content {

        flex: 1;
        display: flex;
        align-items: center;

        > .left {

            flex: 1;
            display: flex;

            > .title{
                font-family: Whitney Bold;
                color: ${colors.title};
            }
            > .description{
                padding-left: 10px;
                color: ${colors.subtitle};
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                line-clamp: 3;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }

            @media (max-width: 650px){
                flex-direction: column;
                > .description{
                    padding-left: 0px;
                    line-clamp: 2;
                    -webkit-line-clamp: 2;
                }
            }
        }
        > .right {

            display: flex;
            padding-left: 10px;
            @media (max-width: 650px){
                flex-direction: column;
                align-items: flex-end;
                > .description{
                    padding-left: 0px;
                }
            }

            .button{
                display: flex;
                font-family: Whitney Bold;
                align-items: center;
                border: 1px solid ${colors.subtitle};
                padding: 4px 10px 4px 6px;
                height: 28px;
                border-radius: 14px;
                cursor: pointer;
                margin-right: 10px;
                color: ${colors.subtitle};
                transition: 200ms;
                user-select: none;

                &:hover{
                    opacity: 0.7;
                }
            }

            .price{

                display: flex;
                align-items: center;

                .unitPrice{
                    padding: 3px;
                    color: ${colors.title};
                    font-family: Whitney Bold;
                }
                .promoPrice{
                    padding: 3px;
                    text-decoration: line-through;
                    color: ${colors.subtitle};
                }
            }

        }
    }

`;


const ProductCard = ({data}:any) => {

    const alert = useAlert();
    const api = useApi();
    const {toggleProduct} = useDispatch();

    const handlerChangeStatus = async () => {

        alert.open("WARNING",{
            message: "Atualizando dados do produto..."
        })
        const res:any = await api.put(`/merchant/products/${data.id}/toggle`)

        if(res.status === 200){
            alert.open("SUCCESS",{
                message: "Venda pausada com sucesso!"
            })
            toggleProduct(res.data)
        }
        else
            alert.open("ERROR",{
                message: "Ops, algo deu errado!"
            })
    }

  return <Container>
      <div className="content">
        <div className="left">
            <div className="title" style={{color: data.enabled ? colors.title : colors.error}}>{data.name}</div>
            <div className="description" style={{color: data.enabled ? colors.title : colors.error}}>{data.description}</div>
        </div>

        <div className="right">
            <ActivateInput onInput={handlerChangeStatus} value={data.enabled}/>
          
            
            <div className="price">
                {data.originalPrice > data.price ? <>
                    <div className="promoPrice">{decimalToMoney(data.originalPrice)}</div>
                    <div className="unitPrice">{decimalToMoney(data.price)}</div>
                </> :
                <>
                    <div className="unitPrice">{decimalToMoney(data.price)}</div>
                </>
                } 
            </div>
          
        </div>
      </div>
  </Container>;
}

export default ProductCard;