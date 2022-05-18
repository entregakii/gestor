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



`;