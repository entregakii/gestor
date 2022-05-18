import React,{ createContext,forwardRef, memo, ReactNode, useContext, useImperativeHandle, useRef, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import Button from '../elements/Button';
import Flex from '../elements/Flex';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';


export interface ModalContextProps {
    print: (toprint: any) => void;
}


const Context = createContext<ModalContextProps>({
    print: () => {},
});


// import { Container } from './styles';

const PrintProvider:React.FC = ({children}) => {

    const alertRef = useRef<any>(null);

    const print = (...props:any) => {



        if(alertRef.current)
            alertRef.current.print(...props)
   
    }

        


  return <Context.Provider value={{print}}>
      <PrintComponent ref={alertRef}/>
      {children}
  </Context.Provider>;
}

// import { Container } from './styles';


export type AlertProps = {

    title?: string,
    description?: string,
    picture?: any,
    buttons?: [{
        title?: string,
        onPress?: () => any
    }],
    disableClose?: boolean,
    footerContainer?: React.FC,
    closeButton?: string

}


const AlertsContainer = styled.div`

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 10000;
    user-select: none;
    pointer-events: none;
    overflow: hidden;   
    background-color: #fff;
    display: flex;
    justify-content: center;
   
    .print{
        max-width: 58mm;
        width: 100%;
        padding: 10px;
  
    }

    .float {
        position: fixed;
        right: 16px;
        top: 16px;
    }


    @media print {

       @page {
            size: 58mm 150mm;
             margin: 0;  /* this affects the margin in the printer settings */
        }
        *{
            font-family: 'Times New Roman';
        }

        .float{
            display: none;
        }

        *:not(.print){
            display: none;
        }
    
    }

`;


const PrintComponent = forwardRef(({},ref) => {

  //  const [visible,setVisible] = useState(false);
    const [toPrint,setToPrint] = useState<any[]>()
    const ref2 = useRef(null);
   // const [modalOptions,setModalOptions] = useState<any>({});

   const print = (toprint:any) => {
        setToPrint(toprint)
        setTimeout(() => {
            window.print();
        }, 500);
    }


    useImperativeHandle(ref,() => ({
        print
    }))
  
   
    useEffect(() => {
        if(ref2.current)
            setTimeout(() => {
                window.print();
            }, 100);
    },[ref2])

    useEffect(() => {
        window.onafterprint = function(){
            setToPrint(undefined)
         }
    },[])

  // if(childrens.length === 0)
  //   return <></>
  
  if(!toPrint)
    return <></>

  return <AlertsContainer>

        <div className='float'>
             <Button variant="contained" title='Imprimir' onClick={() => window.print()}/>
        </div>
 
        <div className="print" ref={ref2}>
            {toPrint.map(line=>(
                <div style={{width: "100%",display: 'flex',justifyContent: line.align || "flex-start"}}>
                    <Heading title={line.text} size={line.size+3} />
                </div>
            ))}
        </div>

        {/* <div className="background"/> */}
  
    </AlertsContainer>
})


const Container = styled.div`

    display: flex;
   
    border-radius: 10px;
    animation: show 500ms;
    transition: 500ms;
    height: 60px;
    right: 20px;
    position: absolute;
    padding: 0px 20px;
    align-items: center;

    .content{
        flex: 1;
    }
    
    @keyframes show {
        0%{
            transform: translateY(calc(100% + 20px));
            opacity: 0;
        }
    }

    .icon {
        padding-right: 10px;
    }


    &.hidden {
        transition: 1s;
        transform: translateY(calc(-100% - 20px));
        opacity: 0;
    }

    @keyframes loading {
       0%{
            transform: rotate(0deg);

       }
       100%{
           transform: rotate(360deg);
  
       }
    }
    .right{
        margin-left: 10px;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        background-color: ${colors.background};
        padding: 4px;
    }

    .loading{
        animation: loading 1s infinite;
        width: 24px;
        height: 24px;
        border: 2px solid transparent;
        border-top: 2px solid ${colors.background};
        border-radius: 12px;
    }
    
`;
  



export const usePrint = () => {

    return useContext(Context);

};

export default PrintProvider;