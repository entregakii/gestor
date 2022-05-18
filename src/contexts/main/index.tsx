import React,{ useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import Context, { ContextDispatchProps, ContextStoreProps } from "./Context";

import MainContextActions from "./Actions";
import config from "../../config";
import MerchantProps, { CategoriesProps, LoginProps } from "../../interfaces/merchantProps";
import cookie from "../../services/cookie";

const MainProvider:React.FC = ({children}) => {

        const [user,setUser] = useState<any>();
        const [login,setLogin] = useState<LoginProps|undefined>();
        const [merchant,setMerchant] = useState<MerchantProps>();
        const [catalog,setCatalog] = useState<any[]>([]);

        const api:AxiosInstance = axios.create({
            timeout: 30000,
            baseURL: config.url.api,
            headers: {
                'authorization': login ? "Bearer "+login.accessToken : "",
                // 'Content-Encoding': 'gzip',
            }
        })

        api.interceptors.response.use((response) => response,async(error) => {
            const status = error.response ? error.response.status : null
            
            if(status === 441){

                // const {credentials} = await MainContextActions.getAccessToken(login.refreshToken).catch(error => {
                //     //this.router.push('/login');
                //     return Promise.reject(error);
                // })
                
                // error.response.config.headers['Authorization'] = 'Bearer ' + credentials.accessToken;
                // setLogin(s => ({...s,...credentials}))
                
                // return axios(error.response.config);

                setLogin({status: "initializing"})
                return axios(error.response.config);
            }
            
            return Promise.reject(error)

        })


        // const getMerchant = async () => {
        //     const {data}:any = await api.get("/merchant");
        
        //     setMerchant(data)
        // }

        // useEffect(() => {
        //     if(user && login?.accessToken)
        //         getMerchant()
        // },[login])

        const initialize = async () => {

            const {login} = await MainContextActions.getDefaultValue();
          
            if(login)
                setLogin(login)
        }
    
        useEffect(() => {
            initialize();
        },[])
    
        const dispatch:ContextDispatchProps = {
            
            login: (login) => {
                setLogin({...login});
                cookie.setItem('@login',JSON.stringify(login))
            },
            setUser: (user:any) => {
                setUser({...user});
            },
            logout: () => {
                setLogin({status:'notlogged'})
                setUser(undefined)
                cookie.removeItem('@login')
            },
            setMerchant,
            setCatalog,
            toggleProduct: (product) => {
                setCatalog((state:any) => {

                    if(!state)
                        return ([])

                    let items = state;

                  
                    items.forEach((c:CategoriesProps) => {
                        let find = c.products.find(p => p.id === product.id)
                        if(find){
                        
                            let indexOf = c.products.indexOf(find);
                            c.products[indexOf] = {...find,enabled: product.enabled};
    
                        }
                    });

                    return ([...items])
                        
                })
            },
            toggleCategory: (category) => {
                setCatalog((state:any) => {

                    if(!state)
                        return ([])

                    let items = state;

                  
                    let find = items.find((c:any) => c.id === category.id)
                    if(find){
                    
                        let indexOf = items.indexOf(find);
                        items[indexOf] = {...find,hide: !find.hide};

                    }

                    return ([...items])
                        
                })
            }
        }
    
      return (
        <Context.Provider value={{store: {user,login,merchant,catalog},dispatch,api}}>
            {children}
        </Context.Provider>
      )
    }

export const useDispatch = () => {
    const {dispatch} = useContext(Context);
    return useMemo(() => dispatch,[dispatch])
};

export const useApi = () => {
    const {api} = useContext(Context);
    return useMemo(() => api,[api])
};

// export const useSelector = (functionState:(state: ContextStoreProps) => void) => {
//     const {store} =  useContext(Context);
//     let result = functionState(store);
//     return useMemo(() => result,[result])
// };


export function useSelector<Selected>(
    selector: (value: ContextStoreProps) => Selected,
  ) {
        const {store} =  useContext(Context);
        let result = selector(store);
        return useMemo(() => result,[result])
}

export default MainProvider