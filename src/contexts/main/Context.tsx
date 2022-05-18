import axios, { AxiosInstance } from "axios";
import { createContext } from "react";
import config from "../../config";
import MerchantProps, { CategoriesProps, LoginProps, ProductProps } from "../../interfaces/merchantProps";


export interface ContextStoreProps {
    user?: MerchantProps,
    login?: LoginProps,
    merchant?: any,
    catalog: CategoriesProps[] | []
}

export interface ContextDispatchProps {
    login: (login:LoginProps) => void;
    setUser: any;
    setMerchant: (data:any) => void,
    logout: () => void;
    toggleProduct: (product: ProductProps) => void,
    setCatalog: (newstate: any) => void,
    toggleCategory: (newstate: CategoriesProps) => void,
}

export interface ContextProps {
    store: ContextStoreProps,
    dispatch: ContextDispatchProps,
    api: AxiosInstance
};

const Context = createContext<ContextProps>({
    store: {
        user: undefined,
        login: undefined,
        merchant: undefined,
        catalog: []
    },
    dispatch: {
        login: () => undefined,
        logout: () => undefined,
        setUser: () => undefined,
        setMerchant: () => undefined,
        toggleProduct: () => undefined,
        setCatalog: () => undefined,
        toggleCategory: () => undefined
    },
    api: axios.create({
        timeout: 500,
        baseURL: config.url.api,
        headers: { 'Accept-Encoding': 'gzip;q=1.0, compress;q=0.5'}
    })
});

export default Context