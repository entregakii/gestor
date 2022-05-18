import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';

import styled from 'styled-components';
import { colors } from '../config';
// import { Container } from './styles';

export interface printRef {
    open: (children: any) => void,
    close: () => void
}

   

export const Container = styled.div`
  
    position: fixed;
    z-index: 2000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
    background-color: ${colors.background};
 
    @media print 
    {
        @page
        {
            size: 3in 6in ;
          
            margin: 0;  /* this affects the margin in the printer settings */
        }
    }



    .page{
        padding: 10px;
    }

    .separator{
        width: 100%;
        height: 1px;
        margin: 10px 0;
        border-bottom: 1px solid ${colors.gray100};
    }

    .item {

        padding: 10px;
        width: 100%;
        display: flex;
        font-size: 10px;

        .qty {
            padding-right: 10px;
            color: ${colors.subtitle};
        }
        .name {
            flex: 1;
        }
        .price {
            padding-left: 10px;
            color: ${colors.subtitle};
        }
    }

    .total {

        padding: 2px 10px;
        width: 100%;
        display: flex;
        font-size: 10px;

        .title {
            flex: 1;
        }
        .price {
            padding-left: 10px;
            color: ${colors.subtitle};
        }

    }

`;


const Alert = forwardRef(({},ref) => {

    const [visible,setVisible] = useState(false);
    const [children,setChildren] = useState<any>();

    const open = (node:any) => {
        setVisible(true);
        setChildren(node);
        setTimeout(() => {
            window.print();
            close();
        },0)
    }

    const close = () => {
        setVisible(false);
        setChildren(undefined);
    }

    useImperativeHandle(ref,() => ({
        open,close
    }))
  
    const containerRef = useRef<HTMLDivElement>(null);

    if(!visible)
        return <></>

    return <Container>
  
        <div className="page" ref={containerRef}>
              {children}
        </div>
  
      </Container>

})


export default Alert;