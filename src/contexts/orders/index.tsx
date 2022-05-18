import React,{ useContext, useEffect, useMemo, useState } from "react";
import { useApi, useSelector } from "../main";
import Context, { ContextDispatchProps, ContextStoreProps } from "./Context";
import Timer from "./Timer";

const OrdersProvider:React.FC = ({children}) => {

        const [orders,setOrders] = useState<any[]>([]);
        const [filter,setFilter] = useState();

        const api = useApi();
    
        const dispatch:ContextDispatchProps = {
            setOrders,
            updateOrder: (data:any) => {
                setOrders((state:any) => {

                    if(!state)
                        return ([])

                        let find = state.find((o:any) => o.id === data.id);
                        let items = state

                        if(find){
                           
                            let indexOf = items.indexOf(find);

                            items[indexOf] = {...find,...data};

                            // find = {...find,...data}
                            // items = [...items.splice(0,indexOf),find,...items.splice(indexOf+1)]

                        }

                        return ([...items])
                        
                })
            },
            upsertOrders: (dataorders:any[]) => {
                setOrders((state:any) => {

                    if(!state)
                        return ([])

                    let items = state

                        dataorders.map(data => {

                        let find = state.find((o:any) => o.id === data.id);

                        if(find){
                           
                            let indexOf = items.indexOf(find);

                            items[indexOf] = {...find,...data};

                            // find = {...find,...data}
                            // items = [...items.splice(0,indexOf),find,...items.splice(indexOf+1)]

                        }
                        else {
                            items = [...items,data];
                        }

                    })

                    return ([...items])
                        
                })
            },
            acknowledgment: async (orders:any) => {
                var newdata = orders.map((o:any) => {
                    return ({
                        status: o.status,
                        id: o.id,
                    })
                })
                await api.put("/orders/acknowledgment",{
                    orders: newdata
                });
            },
            removeOrder: (id:any) => {
                setOrders((state:any) => {

                    if(!state)
                        return ([])

                    return ([...state.filter((o:any) => o.id !== id)])
                        
                })
            },
            setFilter
        }
    
      return (<>
        <Context.Provider value={{store: orders,dispatch}}>
            {children}
            <Timer filter={filter}/>
        </Context.Provider>
        </>
      )
    }

export const useOrdersDispatch = () => {
    const {dispatch} = useContext(Context);
    return useMemo(() => dispatch,[dispatch])
};

export const useOrders = () => {
    const {store} = useContext(Context);
    return useMemo(() => store,[store])
}


export default OrdersProvider