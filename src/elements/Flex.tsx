import React from 'react';
import { ReactChildren } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../config';

const Container = styled.div<any>`
   
    display: flex;
    flex-direction: ${props => ( props['attr-direction'] === "horizontal" ? "row" : "column") + (props['attr-reverse'] ? "-reverse" : "") };

    ${props => props['attr-changedirection'] && css`

        @media(max-width: ${props['attr-changedirection']+"px"}){
          flex-direction: ${props['attr-direction'] === "horizontal" ? "column" : "row"};
        }

    `}
    

`;

type FlexProps = {
  children?: any
  gap?: number
  style?: React.CSSProperties
  type?: "default" | "justify"
  marginHorizontal?: number,
  justifyContent?: "flex-end" | "flex-start" | "center" | "space-between" | "space-around"
  flex?: number[]
  changeDirectionWith?: number
  alignItems?: any
  reverse?: boolean
  direction?: "horizontal" | "vertical"
}

const Flex = ({reverse = false, changeDirectionWith,direction = "horizontal",alignItems = direction === "horizontal" ? "center" : "flex-start",children,justifyContent,flex = [],gap = 0,marginHorizontal = 0,style,type = "default"}:FlexProps) => {
  return <Container attr-reverse={reverse} attr-direction={direction} attr-changedirection={changeDirectionWith} style={{ alignItems,justifyContent,margin: `${marginHorizontal}px 0`,...style,}}>
      {React.Children.map(children,(item:any,index:any) => (
        <div className='flexitem' style={{...(type === "justify" ? ({flex: 1}) : ({flex: flex[index]})) ,...(gap > 0 && index > 0) ? (direction === 'horizontal' ? {marginLeft: gap} : {marginTop: gap}) : ({})}}>
          {item}
        </div>
      ))}
  </Container>;
}

export default Flex;