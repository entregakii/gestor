import React,{CSSProperties, ReactNode} from 'react';
import { css, StyleSheet } from 'aphrodite';
// import { Container } from './styles';

type ViewProps = {
    children?: ReactNode,
    style?: any,
    css?: CSSProperties
}

const View = ({children,style,css:cssStyle}:ViewProps) => {
  return <div className={css(styles.container,style)} style={cssStyle}>
      {children}
  </div>;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    }
}); 

export default View;