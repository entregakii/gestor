import styled from 'styled-components';
import { colors } from '../config';
import Heading from '../elements/Heading';

import FIRST from '../assets/illustrations/first.png'
import { decimalToMoney, formatTimeWithExtension, formatTwoTimesWithExtension } from '../services/functions';
import Icon from '../elements/Icon';
import Button from '../elements/Button';
import { useApi, useSelector } from '../contexts/main';
import Header from '../components/Header';
import { useOrdersDispatch } from '../contexts/orders';
import { useEffect, useRef, useState } from 'react';
import Print, { printRef } from '../components/Print';
import { useAlert } from '../hooks/alert';

const Container = styled.div`

    > .content {

        width: 100%;
        position: relative;

        > .actions {
            
            z-index: 2;
            height: 32px;
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 6px;

            > .reject{
                display: flex;
                align-items: center;
            }
            > .accept{
                display: flex;
                align-items: center;
            }
          
          
        }
        > .background{
            background-color: ${colors.gray100};
            height: 32px;
            border-radius: 16px;
            width: 100%;
            z-index: -1;
            
           > .backgroundcolor{
                height: 32px;
                border-radius: 16px;
                width: 100%;
               
           }
        }
        > .handler{
            width: 100%;
            display: flex;
            justify-content: center;
         

            > .draggable{
                z-index: 5;
                width: 48px;
                height: 48px;
                border-radius: 24px;
                background-color: ${colors.logo_color};
                position: absolute;
                top: -8px;
                cursor: pointer;
                user-select: none;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

`;



const OrderSlider = ({data,onAccept,onReject}:any) => {

    const [draggable,setDraggable] = useState<Boolean>(false);

    const refContainer = useRef<HTMLDivElement>(null);
    const refDrag = useRef<HTMLDivElement>(null);
    const refBackground = useRef<HTMLDivElement>(null);
    //
    var sliderpercent = useRef(0).current;

    const resetPosition = () => {
        const containerBounding = refContainer.current?.getBoundingClientRect();
        const dragBouding = refDrag.current?.getBoundingClientRect();
      
        if(!refDrag.current || !refBackground.current || !containerBounding || !dragBouding)
            return;

        refDrag.current.style.left = (containerBounding?.width/2 - dragBouding.width/2)+"px";
 
        refBackground.current.style.backgroundColor = colors.background_secondary;
        refBackground.current.style.opacity = "0"
    }

    const onMouseDown = () => {
       // setDraggable(true)

    
        document.addEventListener("mouseup",onMouseUp);
        document.addEventListener("mousemove",onMouseMove);

        document.addEventListener("touchend",onMouseUp);
        document.addEventListener("touchmove",onTouchMove);
    }

    const onMouseUp = () => {
      //  setDraggable(false)
        document.removeEventListener("mouseup",onMouseUp);
        document.removeEventListener("mousemove",onMouseMove);

        document.removeEventListener("touchend",onMouseUp);
        document.removeEventListener("touchmove",onTouchMove);

        if(sliderpercent > 0.75)
            onAccept()

        if(sliderpercent < -0.75)
            onReject()

        resetPosition()

     
    }

    const onMouseMove = (e:MouseEvent) => {

        if( !refDrag.current || !refBackground.current || !refDrag.current) 
            return;

        const containerBounding = refContainer.current?.getBoundingClientRect();
        const dragBouding = refDrag.current?.getBoundingClientRect();

        if(!containerBounding)
            return;

        let left = e.clientX - containerBounding.left - (dragBouding.width/2);
        let max = containerBounding.width - dragBouding.width

        if(left < 0)
            left = 0;
        else if(left > max)
            left = max;


        refDrag.current.style.left = left+"px";

        const percent = ((left / (containerBounding.width-dragBouding.width) ) * 2 ) - 1
        sliderpercent = percent;

  
        refBackground.current.style.backgroundColor = (percent > 0) ? colors.success : colors.error;
        refBackground.current.style.opacity = Math.abs(percent).toString()

      
    }

    const onTouchMove = (e:TouchEvent) => {

        if( !refDrag.current || !refBackground.current || !refDrag.current) 
            return;

        const containerBounding = refContainer.current?.getBoundingClientRect();
        const dragBouding = refDrag.current?.getBoundingClientRect();

        if(!containerBounding)
            return;

        let left = e.touches[0].clientX - containerBounding.left - (dragBouding.width/2);
        let max = containerBounding.width - dragBouding.width

        if(left < 0)
            left = 0;
        else if(left > max)
            left = max;


        refDrag.current.style.left = left+"px";

        const percent = ((left / (containerBounding.width-dragBouding.width) ) * 2 ) - 1
        sliderpercent = percent;
  
        refBackground.current.style.backgroundColor = (percent > 0) ? colors.success : colors.error;
        refBackground.current.style.opacity = Math.abs(percent).toString()

      
    }

    useEffect(() => {
        window.addEventListener("resize",resetPosition)
    },[])

  return <Container>
  
    <div style={{paddingBottom: 20}}>
            <Heading title="Deslize para direita ou para esquerda para aceitar ou recusar" align="center"/>
        </div>

        <div className="content" ref={refContainer}>
           <div className="actions">
                <div className="reject">
                    <Icon name="arrow-right" />
                    <Heading title="Recusar" bold size={5}/>
                </div>
              
                <div className="accept">
                    <Heading title="Aceitar" bold size={5}/>
                    <Icon name="arrow-right"/>
                </div>
           </div>
           <div className="background">
               <div className='backgroundcolor' ref={refBackground}/>
           </div>
           <div className="handler">
               <div className="draggable" onTouchStart={onMouseDown} onMouseDown={onMouseDown} ref={refDrag}>
                    <Icon name="arrow-right" color={colors.background}/>
               </div>
           </div>
        </div>
    
       

  </Container>
  

}

export default OrderSlider;