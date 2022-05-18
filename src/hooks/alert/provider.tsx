import React from 'react';
import { useRef } from 'react';
import Alert from './Alert';

import ModalContext from './Context';

// import { Container } from './styles';

const AlertProvider:React.FC = ({children}) => {

    const modalRef = useRef<any>(null);

  

    const open = (type:any,options:any) => {
        modalRef.current.open(type,options)
    }

  return <ModalContext.Provider value={{open}}>
      <Alert ref={modalRef}/>
      {children}
  </ModalContext.Provider>;
}


export default AlertProvider;