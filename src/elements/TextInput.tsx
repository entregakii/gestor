import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import Heading from './Heading';

export const Container = styled.div`
   position: relative;
   flex: 1;
   display: flex;
   flex-direction: column;

   >.title{
      padding: 5px;
     
   }

   >.description{
      display: flex;
      padding: 5px;
   }

   .info {
    font-size: 14px;
    color: ${colors.subtitle};
  
  }
  .error {
    font-size: 14px;
    color: ${colors.error};
    flex: 1;
  }
  .counter {
    font-size: 14px;
    color: ${colors.subtitle};
  }

  > .content{

  
    min-height: 40px;
    border-width: 1px;
   
    border-radius: 10px;
    border: 1px solid ${colors.gray200};
    display: flex;
    align-items: center;
    
  }

  input,textarea{
    padding: 10px;
    font-size: 14px;
    outline: none;
    width: 100%;
  
    color: ${colors.title};

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
      border: none;
     
      -webkit-box-shadow: none;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  textarea{
    resize: none;
    width: 100%;
    height: 100%;
  }

  .showpass{
    padding: 0 10px;
    cursor: pointer;
  }

`;


const TextInput = ({password,title,name,placeholder,showLimit=false,clearErrors,readonly = false,value = "",description,max,onInput,error = false,rows=1,padding=5,leftIcon,rightIcon}:any) => {

  const ref = useRef<any>(null);

  const [focused,setFocused] = useState(false);
  const [showPassword,setShowPassword] = useState(!password);

  console.log(name,error);

 const onChangeText = (e:any) => {

    const text = e.currentTarget.value;


    

    if(!max || text.length <= max)
    {
        onInput(text)
    }
 }

  return useMemo(() => <Container>
   
      {!!title &&<div className="title" ><Heading size={6} title={title} bold/></div> }
      
      <div className="content" style={{borderColor: error ? colors.error : focused ? colors.primary_color : colors.background_secondary,backgroundColor: readonly ? colors.background_secondary : colors.background}}>
          {rows > 1 ? <textarea rows={rows} placeholder={placeholder} name={name} readOnly={readonly} ref={ref} onFocus={() => setFocused(true)} value={value} onChange={onChangeText} onBlur={() => setFocused(false)}  />
          : <input type={!showPassword ? "password" : "text"} placeholder={placeholder} name={name} readOnly={readonly} ref={ref} onFocus={() => setFocused(true)} value={value} onChange={onChangeText} onBlur={() => setFocused(false)}  />
          }
          {password && <div onClick={() => setShowPassword(!showPassword)} className='showpass'>
              <Heading  title={showPassword ? "Esconder" : "Mostrar"} size={8} bold/>
          </div>}
        </div>

      {(description || showLimit || error) && <div className="description">
        { error ? <div className="error">{error}</div> : <div className="info">{description}</div>}
        { showLimit && <div className="counter">{value.length}/{max}</div> }
      </div>}
    </Container>,[value,focused,error,showPassword])
}


export default TextInput