import axios from "axios"
import config from "../../config";
import cookie from "../../services/cookie";

const getAccessToken = async (refreshToken:string) => {
    if(!refreshToken)
        return {credentials: {},user: undefined};

    const {data,status} = await axios.get(config.url.api+"auth/access",{
        params: {
            refreshToken: refreshToken,
        },timeout: 3000
    })

    const {login,user}:any = data;

    return ({user,login: {...login,status: "logged"}})
}

const getDefaultValue = async () => {
    try {

        const getLogin = cookie.getItem("@login");
       
        if(!getLogin)
            throw "not found storage '@login'"

        const login = JSON.parse(getLogin)
        
        return ({login:{...login,status: "initializing"}})
    }
    catch(err) {
        return ({
            login: {status: "initializing"}
        })
    }

}

const MainContextActions = {getAccessToken,getDefaultValue}

export default MainContextActions