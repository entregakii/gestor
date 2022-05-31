const width = window.innerWidth
const height = window.innerHeight

export const colors = {
    //logo_color: "#00AA00",
    logo_color: "#2334FF",
   // primary_color: "#121212",
    primary_color: "#2334FF",
    link: "#004BFF",
    inverse_primary_color: "#fff",

    hightlight: "#ffa700",
    money: "#38B64A",

    red100: "#FFF3F6",
    red400: "#E11900",

    yellow400: "#FFC043",

    orange400: "#FF6937",

    green400: "#05944F",
    green300: "#06C167",
    green200: "#66D19E",
    green100: "#ADDEC9",
    green50:  "#CDFEE9",

    primary: "#000000",
    secondary: "#2334FF",
    third: "#E0DFF2",
    gray900:  "#141414",
    gray800:  "#1F1F1F",
    gray700:  "#333333",
    gray600:  "#545454",
    gray500:  "#757575",
    gray400:  "#AFAFAF",
    gray300:  "#CBCBCB",
    gray200:  "#E2E2E2",
    gray100:  "#EEEEEE",
    gray50:   "#F6F6F6",
   

    black: "#121212",
    title: "#292831",
    subtitle: "#605F67",

    background: "#FFFFFF",
    background_secondary: "#eaeaea",
    border: "#eaeaea",
    ripple: "#F0F0F0",
    shape: "#f9f9f9",
    white: "#FFFFFF",
    gray: "#CFCFCF",

    blue: "#3D7199",
    blue_light: "#EBF6FF",

    error: "#E83F5B",
    error_title: "#ffffff",

    success: "#38B64A",
    success_background: "#EBF6F1",
    success_title: "#ffffff",

    facebook: "#1877f2",

   
    warning_title: "#ffffff",
}

export const layout = {
    window: {
        width,
        height
    },
    isSmallDevice: width < 900,
}

export const shadow = {
    low: {
        // box-shadow: 0px 4px 16px 0px #0000001F;
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.41,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    high: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        

    }
}

const config = {
    "url": {
        //  api: "http://192.168.0.29:3000/", 
        api: "https://gestor-api.entregakii.com.br/", 
        paymentMethodsImagens: "https://files.entregakii.com.br/paymentMethods/",
        productsImagens: "https://files.entregakii.com.br/products/",
        merchantsImagens: "https://files.entregakii.com.br/merchants/",
        promotionsImagens: "https://files.entregakii.com.br/promotions/",
        activityImagens: "https://files.entregakii.com.br/activities/"
    },
    layout,
    shadow,
    "font": {
        bold: "Whitney Bold",
        default: "Whitney",
    }
}

export default config