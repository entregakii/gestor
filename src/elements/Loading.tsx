import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 50px;

   @keyframes loading {
       0%{
            transform: rotate(0deg);

       }
       100%{
           transform: rotate(360deg);
  
       }
   }

   .loading{
       animation: loading 1s infinite;
       width: 24px;
       height: 24px;
       border: 2px solid transparent;
       border-top: 2px solid #000000ff;

       border-radius: 12px;
   }
`;

const Loading = () => {
  return <Container>
      <div className="loading"/>
  </Container>;
}

export default Loading;