import { createGlobalStyle } from 'styled-components'
import WHITNEYBOLD from './assets/fonts/whitney-bold.woff'
import WHITNEY from './assets/fonts/whitney.woff'
import { colors } from './config';


export default createGlobalStyle`


    @font-face {
        font-family: Whitney;
        src: url(${WHITNEY});
    }  
    @font-face {
        font-family: Whitney Bold;
        src: url(${WHITNEYBOLD});
    }     

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }

  view{
    display: flex;
    flex-direction: column;
  }

  a{
      text-decoration: none;
      &:visited, a:hover, a:active {
        color: inherit;
      }
  }
  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 100%;
  }
  *, button, input {
    border: 0;
    background: none;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif;
  }
  html {
    background: var(--primary);
  }

  /* width */
  ::-webkit-scrollbar {
    background: #888;
    height: 10px;
    width: 15px;
    border-radius: 5px;
    border: 5px solid var(--background);
    
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${colors.background};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
     border-radius: 10px;
     border: 3px solid ${colors.background};
     background: #ddd;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #bbb
    
  }

  @media (max-width: 975px) {
    /* .max975{
      display: block;
    } */
    .min975{
      display: none;
    }
  }
  @media (min-width: 976px) {
    /* .min975{
      display: block;
    } */
    .max975{
      display: none;
    }
  }


  

  @media (max-width: 850px) {
    /* .max850{
      display: block;
    } */
    .min850{
      display: none;
    }
  }

  @media (min-width: 851px) {
    /* .min850{
      display: block;
    } */
    .max850{
      display: none;
    }
  }


  @media (max-width: 350px) {
    /* .max350{
      display: block;
    } */
    .min350{
      display: none;
    }
  }

  @media (min-width: 351px) {
    /* .min350{
      display: block;
    } */
    .max350{
      display: none;
    }
  }



  @media (max-width: 450px) {

    .min450{
      display: none;
    }
  }

  @media (min-width: 451px) {

    .max450{
      display: none;
    }
  }


  @media (max-width: 550px) {
    .min550{
      display: none;
    }
  }

  @media (min-width: 551px) {
    .max550{
      display: none;
    }
  }


  @media (max-width: 650px) {
    .min650{
      display: none;
    }
  }

  @media (min-width: 651px) {
    .max650{
      display: none;
    }
  }


  @media (max-width: 750px) {
    .min750{
      display: none;
    }
  }

  @media (min-width: 751px) {
    .max750{
      display: none;
    }
  }

`;