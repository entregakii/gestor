import React from 'react';
import { colors } from '../config';
// import { Container } from './styles';

const sizes:{[index: number]:number} = {
    1: 32,
    2: 24,
    3: 20,
    4: 18,
    5: 16,
    6: 14,
    7: 12,
    8: 11,
    9: 10,
    10: 8
}

export interface HeadingProps {
    title?: string,
    size?: 1|2|3|4|5|6|7|8|9|10;
    bold?: boolean,
    color?: string,
    align?: "center"|"left"|"right"|"justify",
    padding?: number,
    textDecoration?:any
    nowrap?: boolean
}

const Heading = ({title= "",nowrap,textDecoration,size = 3,bold=false,color=colors.gray700,align,padding=0}:HeadingProps) => {
  return <div style={{
      color,
      textAlign: align,
      padding: `${padding}px`,
      display: 'flex',
      alignItems: 'center',
      textDecoration,
      ...(nowrap ? ({whiteSpace: 'nowrap'}) : ({}))
  }} >
      <span style={{
             fontFamily: bold ? "Whitney Bold": "Whitney",
             fontSize: sizes[size],
      }} dangerouslySetInnerHTML={{
      __html: title.toString().replace(/\*([^*]+?)\*/g, "<b>$1<\/b>").replace(/\_\_([^*]+?)\_\_/g, "<u>$1<\/u>").replace(/\_([^*]+?)\_/g, "<i>$1<\/i>")
  }}/>
  </div>;
}


export default Heading;