import React, { memo, useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import { colors } from '../config';
import Heading from './Heading';
import Icon from './Icon';

const Container = styled.div`

    flex: 1;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    user-select: none;
    padding: 10px 0;
    flex-direction: column;

    &.disabled{
        opacity: 0.7;
    }

    > .content {

        display: flex;
        padding-top: 5px;
        align-items: center;

        > .input {

            cursor: pointer;
            /* width: 28px; */
            /* height: 18px; */
            border-radius: 9px;
            margin-right: 5px;
            position: relative;
            background-color: ${colors.background_secondary};

            > .input {
                cursor: pointer;
                /* width: 14px; */
                /* height: 14px; */
                padding: 2px 4px;
                margin: 2px;
                border-radius: 9px;
                width: 50px;
                display: flex;
                justify-content: center;
                position: relative;
                background-color: ${colors.background};
                transition: 200ms;

                /* &:not(.checked)::after{
                    display: block;
                    content: "";
                    border: 2px solid ${colors.title};
                    width: 18px;
                    height: 18px;
                } */
            

                &.checked{
                    background-color: ${colors.primary_color};
                    margin-left: 16px;
                   // transform: translateX(10px);
                }
                &:not(.checked){
                    margin-right: 16px;
                   // transform: translateX(10px);
                }
            }

            }
    }
`;


const ActivateInput = ({title,notes,disabled,value,defaultValue = false,onInput,children}:any) => {

    const handlerOnInput = () => {
        let inputValue = !value;
        if(onInput) onInput(inputValue)
    }

    return <Container className={disabled ? "disabled" : ""}>
        <div className="header">
            <Heading size={6} title={title} bold/>
        </div>
        <div className="content"  onClick={disabled ? () => {} : handlerOnInput}>
            <div className="input">
                {value ? <div className="input checked">
                    <Heading size={8} title={"Ativado"} color={colors.background} bold/>
                </div> :
                <div className="input">
                    <Heading size={8} title={"Pausado"} bold/>
                </div> }
            </div>
        </div>
    </Container>
}

export default memo(ActivateInput);








