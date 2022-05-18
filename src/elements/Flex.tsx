import React from 'react';
import { ReactChildren } from 'react';
import styled from 'styled-components';
import { colors } from '../config';

const Container = styled.div`
   
    display: flex;

  
    .flexitem {

    }

`;

type FlexProps = {
  children?: any
  gap?: number
  style?: React.CSSProperties
  type?: "default" | "justify"
  marginHorizontal?: number,
  justifyContent?: "flex-end" | "flex-start" | "center" | "space-between" | "space-around"
  flex?: number[]
  alignItems?: any
  direction?: "horizontal" | "vertical"
}

const Flex = ({direction = "horizontal",alignItems = direction === "horizontal" ? "center" : "flex-start",children,justifyContent,flex = [],gap = 0,marginHorizontal = 0,style,type = "default"}:FlexProps) => {
  return <Container style={{flexDirection: direction === "horizontal" ? "row" : "column", alignItems,justifyContent,margin: `${marginHorizontal}px 0`,...style,}}>
      {React.Children.map(children,(item:any,index:any) => (
        <div className='flexitem' style={{...(type === "justify" ? ({flex: 1}) : ({flex: flex[index]})) ,...(gap > 0 && index > 0) ? (direction === 'horizontal' ? {marginLeft: gap} : {marginTop: gap}) : ({})}}>
          {item}
        </div>
      ))}
  </Container>;
}

export default Flex;