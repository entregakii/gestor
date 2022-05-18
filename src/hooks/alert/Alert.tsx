import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';

import styled from 'styled-components';
import { colors } from '../../config';
import Icon from '../../elements/Icon';

// import { Container } from './styles';

interface callbackProps {
    open: () => void,
    update: (state: any) => React.FC,
    close: () => void
}

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


export const Container = styled.div`

  
        position: fixed;
        z-index: 2000;
        padding: 2rem;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        pointer-events: none;

   
      > .window {
            pointer-events: all;
            max-width: 500px;
            padding: 1rem;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 4px 17px 6px rgb(0 0 0 / 7%);
            transition: 100ms;
            animation: animation 100ms;
            background-color: ${colors.success};

            .top{
                display: flex;
                align-items: center;
            }

            .bottom{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px;
            }

            button {
                border-radius: 5px;
                cursor: pointer;
                box-shadow: 0 4px 17px 6px rgb(0 0 0 / 3%);
                margin: 5px;
                user-select: none;
                padding: 10px 30px;
                font-family: Whitney Bold;
                background-color: ${colors.background};
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                transition: 200ms;

                &:hover{
                    background-color: ${colors.background_secondary};
                }
                
            }

            .text{
                font-size: 1.25rem;
                font-family: Whitney Bold;
                color: ${colors.background};
                line-height: 20px;
            }
            .icon{
                margin-right: 0.5rem;
                width: 24px;
                height: 24px;
                
            }
            .close{
                margin-left: 20px;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 6px;
                padding: 3px;
                &:hover{
                    background-color: #00000033;
                }
            }

            &.closeani{
                opacity: 0;
            }

      }

      @keyframes animation {
          0% {
            opacity: 0;
          }
          100%{
            opacity: 1;
          }
      }

     

  

 
`;


const Alert = forwardRef(({},ref) => {

    const [visible,setVisible] = useState(false);
    const [options,setOptions] = useState<any>({});
    const [time,setTime] = useState(30)
    var timeout = useRef<any>().current;

    useEffect(() => {
        if(time > 0 )
            timeout = setTimeout(() => {setTime(state => state - 1)},100)

        else if(time === 0)
            close();

        return () => window.clearTimeout(timeout);
    },[time])

    const preOptions:any = {
        SUCCESS: {
            message: "Sucesso!",
            icon: "check",
            backcolor: colors.success,
            forecolor: colors.success_title,
            align: "flex-end"
        },
        ERROR: {
            message: "Ops algo deu errado!",
            icon: "close",
            backcolor: colors.error,
            forecolor: colors.error_title,
            align: "flex-end"
        },
        WARNING: {
            message: "Atenção!",
            icon: "info",
            backcolor: colors.yellow400,
            forecolor: colors.warning_title,
            align: "flex-end"
        },
        QUESTION: {
            message: "Escolha uma opção!",
            icon: "interogation",
            backcolor: colors.primary_color,
            forecolor: colors.background,
            callback: () => {},
            confirmTitle: "Confirmar",
            cancelTitle: "Cancelar",
            align: "flex-end"
        },
    }


      const open = (type:any,options?:any ) => {
        containerRef.current?.classList.add("openani")
        setVisible(true)
        setOptions({...preOptions[type],...options,type})

        if(type !== "QUESTION")
            setTime(30)
        else
            setTime(-1)
      }


      const close = () => {
        containerRef.current?.classList.add("closeani")
        setTimeout(() => {
          setVisible(false);
          setOptions({})
        },200);
      }


      useImperativeHandle(ref,() => ({
        open,close
    }))
  
    const containerRef = useRef<HTMLDivElement>(null);

    if(!visible)
        return <></>

    return <Container style={{justifyContent: options.align}}>
  
        <div className="window" ref={containerRef} style={{backgroundColor: options.backcolor}}>
              <div className="top">
                  <div className="icon"><Icon name={options.icon} color={options.forecolor}/></div>
                  <div className="text" style={{color: options.forecolor}}>
                      {options.message}
                  </div>
                  <div className="close" onClick={close}><Icon name="close"  color={options.forecolor}/></div>
              </div>
              { options.callback && <div className="bottom">
                  <button onClick={options.callback}>{options.confirmTitle}</button>
                  <button onClick={close}>{options.cancelTitle}</button>
              </div> }
        </div>
  
      </Container>

 
})


export default Alert;