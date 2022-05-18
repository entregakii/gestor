const cookie = {
    setItem: (cookieName:string, cookieValue:string, expire:number = (24*60*60*1000),path:string = "/") => {
        let date = new Date();
        date.setTime(date.getTime()+(expire));
        document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toUTCString()+"; path="+path+";"
    },
    removeItem: (cookieName:string) => {
        document.cookie = cookieName + "=; expires=Sun, 01 Jan 0 00:00:00 UTC; path=/;"
    },
    getAll: () => {
        let splitted = document.cookie.split(";")
        let cookies = {};
        // eslint-disable-next-line array-callback-return
        splitted.map(c => {
            let [key,value] = c.split("=");
            cookies = {...cookies,[key]: value}
        })
        return cookies
    },
    getItem: (cookieName:string) => {
        let splitted = document.cookie.split(";")
        let cookie = splitted.find(c => (c.split("="))[0].replace(" ","") === cookieName )
        return cookie?.split("=")[1]
    }
}

export default cookie