type MerchantProps = {
    id: string
    name: string
    description: string | null
    slug: string
    picture: string | null
    cover: string | null
    minOrderValue: number
    preparationTime: number
    payments: any[]
    enable: boolean
    activity: activityTypes,
    superMerchant: boolean
    phones: string
    cnpj: string
    viewMode: "SHELF" | "MENU"
    createdAt: Date | null
    updatedAt: Date | null

    categories: CategoriesProps[]
    //QUERY
    open: boolean
    distance: number
    deliveryMethods: DeliveryMethodsProps[]
}

export interface LoginProps {
    status: "initializing"|"logged"|"notlogged"|"completed"|"disconected",
    accessToken?: string,
    refreshToken?: string,
}

export type DeliveryMethodsProps = {
    id: number
    merchantId: string
    type: deliveryTypes
    feeFreeFrom: number
    fee: number
    minValue: number
    maxValue: number | null
    minTime: number
    maxTime: number
    allowSchedule: boolean
    enable: boolean
    cityCode: string
}

const deliveryTypes = {
    DELIVERY: "DELIVERY",
    TAKEOUT: "TAKEOUT"
};

type deliveryTypes = (typeof deliveryTypes)[keyof typeof deliveryTypes]

export type activityTypes = {
    name: string
    code: string
    picture: string
}

export default MerchantProps

export type PaymentMethodsProps = {
    code: string
    name: string
    picture: string | null
    type: paymentTypes,
   
  }
  
enum paymentTypes {
    CRE,
    DEB,
    OTH,
    ONL
};
  
  
export type CategoriesProps = {
    id: string
    index: number 
    merchantId: string
    name: string
    picture: string | null
    notes: string | null
    schedules: object | null
    products: ProductProps[]
}

export type ProductProps = {
    id: string
    index: number 
    categoryId: string
    name: string
    description: string
    picture: string | null
    originalPrice: number 
    price: number 
    promotion: boolean 
    enabled: boolean 
    highlight: boolean 
    choices: ChoiceProps[]
}

export type ChoiceProps = {
    id: string
    merchantId: string
    name: string
    min: number 
    max: number | null
    type: ChoiceTypes 
    garnishItems: GarnishItemsProps[]
}

export type GarnishItemsProps = {
    id: string
    choiceId: string
    name: string
    description: string | null
    unitPrice: number
}
  

const ChoiceTypes = {
    NUMERIC: 'NUMERIC',
    SELECT: 'SELECT'
};

type ChoiceTypes = (typeof ChoiceTypes)[keyof typeof ChoiceTypes]
