import React, { useCallback, useState } from 'react';
import DotObject from '../services/dot-object';

// import { Container } from './styles';

const dotStringToArray = (array:any = {
    "name": "oi",
    "group.element1.name": "numero 1",
    "group.element1.desc": "...",
    "group.element2.name": "numero 2",
    "group.element2.desc": "......",
}) => {

   let result:any = {};

    Object.keys(array).map(key => {
        let value = array[key];

        let dotSplit = key.split(".");
        let dots = dotSplit.reverse();
        let obj = {};
        dots.map((dotKey,i) => {
           
            if(i === 0){
                obj = { ...obj,[dotKey]: value }
            }
            else{
                obj = { [dotKey]: obj }
            }

        })
        result =  Object.assign(result, obj);
    })

    return result
}

interface fieldsProps {
    [name: string]: {
        defaultValue?: any,
        value: any
    }
}

interface optionsProps {
    onlyModified?: boolean
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

export const useStateForm = (initialData: any = {},validity: validityProps = {},formOptions:optionsProps = {}) => {
 
  //  var fields = useRef<fieldsProps>({}).current;
    // const [fields,setFields] = useState<fieldsProps>({});
    const [fields,setFields] = useState<any>(DotObject.dot(initialData));
    const [historyFields,setHistoryFields] = useState<any>(DotObject.dot(initialData));
    // const [fields,setFields] = useState<any>(initialData);
    // const [historyFields,setHistoryFields] = useState<any>(initialData);


    const insertField = (field:string,value: any) => {
        
      //  fields[field] = {...fields[field],...values};


            setFields((state:any) => ({...state,
                [field]: value
            }))
  
       
            //fields[field].value = value;
      
    
    }
    // const setFields = (fncNewValue:any) => {
    //     let newvalue = fncNewValue(fields);
    //     fields = newvalue;
    // }

    const lastfields = React.useRef<any>();

    const options:optionsProps = {
        onlyModified: true,
        ...formOptions
    }

    const [errors,setErrors] = useState<errorsProps>({})


    const validityFields = useCallback(() => {

        Object.keys(validity).map(field => {


            let validate = validity[field];
            let value = fields[field];
            let key = field;

            console.log(validate,key,value)

            if(validate.require && (!value || (typeof value === "number" && value === 0 ))){
                setErrors({[key]: "Preencha esse dado."})
              
        
                throw new Error(`${key} is not a valid input`)
            }
            else if(validate.minLength && ( (!value && validate.minLength > 0) || (value.length < validate.minLength)) ){
                setErrors({[key]: `Preencha esse dado com ${validate.min} caracteres.`})
        
                throw new Error(`${key} is not valid`)
            }
            else if(validate.min && ( (!value && validate.min > 0) || (value < validate.min)) ){
                setErrors({[key]: `Valor minimo deste campo é ${validate.min}.`})
        
                throw new Error(`${key} is not valid`)
            }
               
        })

    },[fields,validity])

    const diffField = useCallback(() => {

        let returnFields:any = {};

       
        
        Object.keys(fields).map(name => {

            let defaultValue = historyFields[name];
            let value = fields[name];

            if( !String(defaultValue) || String(value) !== String(defaultValue))
            {
                returnFields[name] = value;
            }

        })

        return returnFields
        
    },[historyFields,fields])

    const getFields = useCallback(() => {
     
        try {
            validityFields();
            let fi = options.onlyModified ? diffField() :  DotObject.object(fields);
            return DotObject.object(fi);
        }
        catch (err) {
            return undefined;
        }

    },[historyFields,fields,validity])

    const isModified = useCallback(() => {
     
        let fi = diffField();
        return Object.keys(fi).length > 0

    },[historyFields,fields])

    const setError = useCallback((field:string,message: string) => {
        setErrors((laststate) => {
            return ({...laststate,[field]: message})
        })
    },[initialData])


    const setInitialData = useCallback((object:any) => {

        if(!object)
            return;


       setHistoryFields(DotObject.dot(object));
       setFields(DotObject.dot(object));

    // setHistoryFields(object);
    // setFields(object);

    },[initialData])

    const setField = useCallback((field:string,value: any) => {
  
        insertField(field,value)
           
    },[initialData])

   

    const removeField = useCallback((field:string) => {
            delete fields[field]
            console.log(fields)
    },[initialData])

    const getDefaultValue = useCallback((name) => {
      
        return (
            initialData[name] ? initialData[name] : undefined
        )
    
    },[initialData])

   

    const registerField = useCallback((name :string,onInputSecond?: any) => {

        //let defaultValue = getDefaultValue(name)
     
        const value = fields[name];
      
        const onInput = (value:any) => {

            onInputSecond && onInputSecond(value)
         
            insertField(name,value);

            if(errors[name])
                setErrors(s => {
                    delete s[name]
                    return s
                })
            

        }


        return ({onInput,error: errors[name],name,defaultValue:value,value})

    },[errors,initialData,fields])

    if (!lastfields.current){
        lastfields.current = initialData
    }

    return ({getFields,isModified,registerField,setInitialData,fields,errors,setError,setField,removeField})//({getFields,registerField})

}

