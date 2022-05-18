import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

// import { Container } from './styles';

interface fieldsProps {
    [name: string]: {
        defaultValue: any,
        value: any
    }
}

interface optionsProps {
    defaultValue?: boolean
}

interface errorsProps {
    [input: string]: string | undefined
}

interface validityProps {
    [input: string]: {
        require?: boolean,
        min?: number,
        minLength?: number,
    }
}

export const useForm = (initialData: any = {},validity: validityProps = {},formOptions:optionsProps = {}) => {
 
    var fields = useRef<fieldsProps>({}).current;
    //const [fields,setFields] = useState<fieldsProps>({});
    // const setFields = (fncNewValue:any) => {
    //     let newvalue = fncNewValue(fields);
    //     fields = newvalue;
    // }

    const lastfields = React.useRef<any>();

    const options:optionsProps = {
        defaultValue: true,
        ...formOptions
    }

    const [errors,setErrors] = useState<errorsProps>({})

    useEffect(() => {
       
    },[])

    const validityFields = useCallback(() => {

        Object.keys(validity).map(field => {
            let getField = fields[field];
            if(!getField)
                return;
            

            let value = getField.value 
        
            let validate = validity[field];

       

            if(validate.require && (!value || (typeof value === "number" && value === 0 ))){
                setErrors({[field]: "Preencha esse dado."})
             
        
                throw new Error(`${field} is not valid`)
            }
            else if(validate.minLength && ( (!value && validate.minLength > 0) || (value.length < validate.minLength)) ){
                setErrors({[field]: `Preencha esse dado com ${validate.min} caracteres.`})
        
                throw new Error(`${field} is not valid`)
            }
            else if(validate.min && ( (!value && validate.min > 0) || (value < validate.min)) ){
                setErrors({[field]: `Valor minimo deste campo é ${validate.min}.`})
        
                throw new Error(`${field} is not valid`)
            }
               
        })

    },[initialData])

    const diffField = useCallback(() => {

        let returnFields:any = {};
        
        Object.keys(fields).map(name => {

    
            let {value = "",defaultValue = ""} = fields[name];

            if( value.toString() !== defaultValue.toString())
            {
                returnFields[name] = value;
            }

        })

        return returnFields
        
    },[initialData])

    const getFields = useCallback(() => {
     
            validityFields();
            let fi = diffField();
           
            return fi

    },[initialData])

    const setError = useCallback((field:string,message: string) => {
        setErrors((laststate) => {
            return ({...laststate,[field]: message})
        })
    },[initialData])

    const setField = useCallback((field:string,value: any) => {
        // setFields((fields:any) => {
            
        //     fields[field].value = value;

        //     return ({...fields})
        // })
            
            fields[field].value = value;
    },[initialData])

    const getDefaultValue = useCallback((name) => {
      
        return (
            initialData[name] ? initialData[name] : undefined
        )
    
    },[initialData])

    const saveField = useCallback((name:string,defaultValue:any,value?:any) => {
       
        fields[name] = {
            value: value ? value : defaultValue,
            defaultValue:  options.defaultValue ? defaultValue : undefined
        }
        // setFields((lastfields:any) => {

        //     fields[name] = {
        //         value: value ? value : defaultValue,
        //         defaultValue: defaultValue // options.defaultValue ? defaultValue : undefined
        //     }

        //     return ({...lastfields})

        // })

    },[initialData])

    const registerField = useCallback((name :string,onInputSecond?: any) => {

        let defaultValue = getDefaultValue(name)
     
        const field = fields[name];
     
        if(!field){
            saveField(name,defaultValue)
        }
 
      
        const onInput = (value:any) => {

            //fields[name].value = value
          
            onInputSecond && onInputSecond(value)

            // setFields((fields:any) => {
            //     console.log(fields);
            //     fields[name].value = value;
               

            //     return ({...fields})
            // })
         
            fields[name].value = value;


        }

        const clearErrors = () => {
            setErrors({...errors,[name]: undefined})
        }
      
        // if(!fieldList.includes(name))
        //     fieldList = [...fieldList,name]

      //  fields[name] = defaultValue;

        return ({onInput,error: errors[name],name,defaultValue: field ? field.value : defaultValue,clearErrors})
        
    },[errors,initialData])

    if (!lastfields.current){
        lastfields.current = initialData
    }

    return ({getFields,registerField,fields,setError,setField})//({getFields,registerField})

}

