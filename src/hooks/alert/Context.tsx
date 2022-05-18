import { createContext } from "react";


export interface AlertContextProps {
    open: any
    
}

const AlertContext = createContext<AlertContextProps>({
    open: () => {

    }
});

export default AlertContext