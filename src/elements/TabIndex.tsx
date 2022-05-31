import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import Heading from './Heading';
import Icon from './Icon';


const Container = styled.div`
   
    /* width: 100%;
    min-height: 200px;
    border: 1px solid ${colors.background_secondary};
    border-radius: 10px;
    margin: 30px 0;
    display: flex;
    flex-direction: column; */
    height: 100%;
    
    display: flex;
    flex-direction: column;

    > .top {

        padding: 0 30px;
 
    > .header{
        width: 100%;
        display: flex;
        position: relative;
        padding: 15px 0;
        align-items: center;
        justify-content: center;

        > .tab{
            font-family: Whitney;
            margin-right: 20px;
            padding: 5px 0;
            display: flex;
            align-items: center;
            color: ${colors.gray400};
            font-size: 18px;
            position: relative;
            cursor: pointer;

            .notify {
                background-color: ${colors.gray400};
                flex-shrink: 0;
                min-width: 18px;
                height: 18px;
                border-radius: 10px;
                margin-left: 5px;
                display: flex;
                align-items: center;
                justify-content: center;

                > div{
                    margin-top: -2px;
                }
            }

            &:hover::after{
                content: "";
                bottom: -2px;
                display: block;
                width: 100%;
                height: 2px;
                background-color: ${colors.gray400};
                position: absolute;
                border-radius: 2px;
            }
            &.selected{
                color: ${colors.logo_color};

                .notify {
                    background-color: ${colors.logo_color};
                }
            }
            &.selected::after{
                content: "";
                bottom: -2px;
                display: block;
                width: 100%;
                height: 2px;
                background-color: ${colors.logo_color};
                position: absolute;
                border-radius: 2px;
            }
        }

        &::after{
            content: "";
            bottom: 13px;
            display: block;
            width: 100%;
            height: 2px;
            background-color: ${colors.gray200};
            position: absolute;
            z-index: -1;
            border-radius: 2px
        }
    }

}

    > .content {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        padding: 0 20px;
        height: 100%;

        @media (max-width: 650px){
            padding: 0px;
        }
    }
    
`;


const TabIndex = ({tabs,children,error}:any) => {

    const [currentTab,setCurrentTab] = useState(0);    

  return <Container>

      <div className='top'>

        <div className="header">
            {
                tabs.map((tab:any,index:number) => (
                    <div key={index} className={`tab ${index === currentTab ? "selected" : ""}`} onClick={() => setCurrentTab(index)}>
                        <Icon name={tab.icon} size={18}/><div style={{width: 5}}/>
                        <div className='min550'>
                            <Heading size={5} color={index === currentTab ? colors.secondary :  colors.gray400} title={tab.title}/>
                        </div>
                        <div className='max550'>
                            <Heading size={5} color={index === currentTab ? colors.secondary :  colors.gray400} title={tab.title.substring(0,3)+"..."}/>
                        </div>
                        {(!!tab.notify && tab.notify > 0) && <div className='notify'>
                            <Heading bold size={7} color={colors.background} title={tab.notify}/>
                        </div>}
                    </div>
                ))
            }
        </div>

        </div>
      
        <div className="content">
            
             {children[currentTab]} 
            
            {/* {tabs.map((t:any) => (
                <>{t.children()}</>            
            ))} */}
    
        </div>

    

  </Container>;
}

export default TabIndex;