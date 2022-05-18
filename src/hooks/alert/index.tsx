import React, { ReactNode } from 'react';
import { useContext } from 'react';
import AlertContext from './Context';

// import { Container } from './styles';
    
export const useAlert = () => {

    const modalOptions = useContext(AlertContext);
    return modalOptions

};

