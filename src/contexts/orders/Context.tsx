import axios, { AxiosInstance } from "axios";
import { createContext } from "react";
import config from "../../config";
import MerchantProps, { LoginProps } from "../../interfaces/merchantProps";


export interface ContextStoreProps {
   
}

export interface ContextDispatchProps {
   
}

export interface ContextProps {
    store: any[],
    dispatch: any,
};

const OrdersContext = createContext<ContextProps>({
    store: [],
    dispatch: {},
});

export default OrdersContext