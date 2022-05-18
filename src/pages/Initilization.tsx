import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Clock from "../components/Clock";
import DeliveriesNavigator from "../components/DeliveriesNavigator";
import OrdersNavigator from "../components/OrdersNavigator";
import config, { colors } from "../config";
import { useDispatch, useSelector } from "../contexts/main";
import { useOrders, useOrdersDispatch } from "../contexts/orders";
import Heading from "../elements/Heading";
import cookie from "../services/cookie";
import OrderPage from "./Order";

export const Container = styled.div`
 
  width: 100%;
  height: 100vh;

  background-color: #f0f2f5;
//  background-image: linear-gradient(180deg, #eae6df, #d1d7db);

    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

  .pcSvg{
      animation: pcSvgAnimation 2s;
  }
  .logoSvg{
      animation: logoSvgAnimation 2s;
  }
  
    @keyframes pcSvgAnimation {
       
        0%, 50%{
          opacity: 0;
            transform: translateX(-95px)
        }
    }
    @keyframes logoSvgAnimation {
       
        0%, 50%{
            transform: translateX(95px);
           
        }
    }
    @keyframes dotsGroupAnimation {
        0%{
            opacity: 0;
        }
        70%{
            opacity: 0;
        }
    }

  @keyframes dotloading {
      0%{
        fill: #bbc5cb;
      }
      50% {
        fill:#B6B6B622;
      }
      100%{
        fill: #bbc5cb;
      }
  }

  .dotsLoading{
      animation: dotsGroupAnimation 2s;
      circle {
          animation: dotloading 1s infinite;
      }
  }

  .progressBar{
      height: 3px;
      width: 300px;
      border-radius: 1.5px;
      background-color: #bbc5cb;
      margin: 20px 0;

      .progress{
        height: 3px;
        border-radius: 1.5px;
        background-color: #00ddaa;
        transition: width 200ms;
     
    }

  }
  
`;

const InitializationPage = ({ match }: any) => {

    const {login} = useSelector(s => s);
    const dispatch = useDispatch();
    const {upsertOrders,acknowledgment} = useOrdersDispatch();

    let steps = [
        {
            message: "Conetando ao servidor.",
            url: "status",
        },
        {
            message: "Validando credenciais de acesso.",
            url: "auth/access/?refreshToken="+login?.refreshToken,
            success: (data:any) => {
              //@ts-ingore
              dispatch.login({...data.login,'status':'initializing'});
            }
        },
        {
          message: "Baixando dados do usuário",
          url: "merchant/employee",
          success: (data:any) => {
            dispatch.setUser(data);
          }
        },
        {
          message: "Baixando dados da loja",
          url: "merchant",
          success: (data:any) => {
            dispatch.setMerchant(data);
          }
        },
        // {
        //     message: "Baixando pedidos ativos.",
        //     url: "/orders/recent",
        //     success: async (data:any) => {
        //       upsertOrders(data);
        //       acknowledgment(data);
        //     }
        // },
        // {
        //     message: "Baixando catalogo de produtos.",
        //     url: "/categories",
        // }
    ]

    const [complete,setComplete] = useState(false);
    const [currentStep,setCurrentStep] = useState(0);
    const [tpt,setTpt] = useState(50);
    const estimatedTime = 10000

    const [time,setTime] = useState(0);
    const [error,setError] = useState(false);

    let step = steps[currentStep];
  
    let total = (steps.length)*estimatedTime;


    const initialize = async () => {

        if(!error){
          try {
              if(currentStep > 0 && !login?.accessToken)
                 throw 'error'
              const {data} = await axios.get(config.url.api+step.url,{headers: currentStep > 1 ?{
                  'authorization': "Bearer "+login?.accessToken
              } : {}})
              if(step.success)
                step.success(data);
          }
          catch {
              console.log('error',step.url)
              setError(true)
          }
        }

        console.log('get')

        if(currentStep < steps.length-1){
            let newtime = (currentStep+1)*estimatedTime
            if(newtime > time)
              setTime(newtime)

            setCurrentStep(currentStep + 1);
        }
        else{
            setComplete(true)
            setTime(total)
            
        }
   
    }

    // const getRefreshToken = () => {
    //     const getLogin = cookie.getItem("@login");
    //     if(!getLogin) return;

    //     const login = JSON.parse(getLogin);
    // }

    useEffect(() => {
        initialize()
    },[currentStep])

    useEffect(() => {
      if(complete){
        if(error)
          dispatch.login({status: 'notlogged'});
        else
          dispatch.login({...login,status:'completed'})
      }  
  },[complete])

    useEffect(() => {
        if(!complete){

          if(time > total - (tpt*10)){
            setTpt(tpt/2);
          }

            setTimeout(() => {
                setTime((state) => state + tpt)
            },tpt);
        }
    },[time])


   
    let progress = time*100/total;
    let width = progress > 100 ? 100+"%" : progress+"%"
    

  return (
    <Container>
      <div className="content">
        <div className="animation">
          <span>
            <svg
              width="250px"
              height="52px"
              viewBox="0 0 250 52"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="dotsLoading">
                <circle
                  style={{animationDelay: '50ms'}}
                  fill="#B6B6B6"
                  cx="65.7636689"
                  cy="21.1046108"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '100ms'}}
                  fill="#B6B6B6"
                  cx="81.0791876"
                  cy="19.3283142"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '150ms'}}
                  fill="#B6B6B6"
                  cx="96.3947063"
                  cy="17.7846275"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '200ms'}}
                  fill="#B6B6B6"
                  cx="111.710225"
                  cy="17.5274031"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '250ms'}}
                  fill="#B6B6B6"
                  cx="127.025744"
                  cy="17.6118619"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '300ms'}}
                  fill="#B6B6B6"
                  cx="142.341262"
                  cy="18.4196288"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '350ms'}}
                  fill="#B6B6B6"
                  cx="157.656781"
                  cy="19.9893339"
                  r="3.65625"
                ></circle>
                <circle
                style={{animationDelay: '400ms'}}
                  fill="#B6B6B6"
                  cx="172.9723"
                  cy="22.0657859"
                  r="3.65625"
                ></circle>
              </g>
              <path
                color="#bbc5cb"
                className="pcSvg"
                d="M190.14097 4.7518926h48.227869l.281462-.00596781c1.058365-.00288774 2.664865.25185461 2.695721 2.87464716.142823 12.13996425 0 22.28077555 0 34.40910725 0 .06028-.024112.168784-.036168.217008l-16.394805-.0086927c-12.47317.0007215-24.136918.0136044-37.78743-.0033633l-.010915-6.2953341c-.030319-9.5718533-.105914-18.2714581.010915-28.31872515.033356-2.86867935 1.976535-2.91690333 3.013351-2.86867935zm20.097267 4.28597465l-19.256815-.00079524.002426 4.98254029c-.000422 6.5558423-.012657 12.8111695-.002954 19.3619492l.011919 4.9777941h46.536157l.008754-4.9777414c.010547-8.1882109.002637-15.913459.002637-24.3331514l-27.302124-.01059555zM179.195421 44.6572387c.397848-.036168.807752-.024112 1.2056-.024112 9.620684 0 19.241369-.012056 28.862053 0 .132616.4701838.54252 1.6393289 1.036816 1.6393289 3.255119.012056 4.510238 0 7.765357 0 .542519.036168.988591-1.1450331 1.133263-1.6513849 9.910029 0 19.820057.012056 29.730086.012056.084392.012056.265232.036168.349624.048224-.016075.2571945-.016075 1.0085894 0 2.2541846 0 1.4209691-1.193544 1.8201689-1.965128 2.1215688-.421959.1205599-.868031.1326159-1.289991.1928959h-63.560505c-.651024-.072336-1.350272-.108504-1.916904-.4701838-.566631-.2893439-1.000647-.7595278-1.350271-1.2779356v-2.8446419z"
                fill="currentColor"
              ></path>
              <path
              clipRule="evenodd"
              fillRule="evenodd"
                color="#bbc5cb"
                className="logoSvg"
                d="M10.7392 32.5412C11.0151 32.816 11.1539 33.1439 11.1539 33.5224C11.1539 33.9026 11.0151 34.2288 10.7392 34.5078C10.4591 34.7843 10.1258 34.9259 9.72914 34.9259C9.34704 34.9259 9.01036 34.7843 8.73105 34.5078C8.44746 34.2288 8.30782 33.9026 8.30782 33.5224C8.30782 33.1439 8.44746 32.816 8.73105 32.5412C9.01036 32.2614 9.34704 32.1248 9.72914 32.1248C10.1258 32.1248 10.4591 32.2614 10.7392 32.5412Z M19.2671 32.5412C19.5472 32.816 19.6843 33.1439 19.6843 33.5224C19.6843 33.9026 19.5472 34.2288 19.2671 34.5078C18.9921 34.7843 18.6554 34.9259 18.263 34.9259C17.8766 34.9259 17.5451 34.7843 17.2606 34.5078C16.9805 34.2288 16.8374 33.9026 16.8374 33.5224C16.8374 33.1439 16.9805 32.816 17.2606 32.5412C17.5451 32.2614 17.8766 32.1248 18.263 32.1248C18.6554 32.1248 18.9921 32.2614 19.2671 32.5412Z M10.7392 14.7563C10.8592 14.8793 10.9577 15.0135 11.0271 15.1542H8.44062C8.50831 15.0135 8.60682 14.8793 8.73105 14.7563C9.01036 14.4781 9.34704 14.3398 9.72914 14.3398C10.1258 14.3398 10.4591 14.4781 10.7392 14.7563Z M7 0C3.13401 0 0 3.13401 0 7V45C0 48.866 3.13401 52 7 52H45C48.866 52 52 48.866 52 45V7C52 3.13401 48.866 0 45 0H7ZM26.6376 37.2616H23.6861V33.5224C23.6861 32.0692 23.1404 30.782 22.0969 29.7528C21.9332 29.5918 21.761 29.4393 21.5803 29.2993C21.7585 29.1603 21.9289 29.0102 22.0926 28.8501C23.1352 27.8234 23.6861 26.5413 23.6861 25.0864C23.6861 23.634 23.1344 22.3485 22.0926 21.3227C22.0043 21.2367 21.9152 21.1541 21.8244 21.0749H23.6861V16.0063C23.6861 14.5506 23.1412 13.2617 22.0969 12.2318C22.0146 12.1526 21.9324 12.0749 21.8467 12H26.6376V23.3786L29.6456 20.4208H37.4949L28.9369 28.8408L34.7198 34.5305V31.1361C36.7084 31.1361 38.5623 31.1605 40.2715 31.4446V37.2616H29.6456L26.6376 34.3029V37.2616ZM40.2715 20.4208V27.1642C38.4099 26.693 36.4582 26.5463 34.7198 26.5463V25.883L40.2715 20.4208ZM42.4485 20.4208V27.9001C45.5662 29.2631 47.9991 31.8972 47.9991 36.825C46.44 34.1672 44.5799 32.7478 42.4485 31.9933V37.2616H47.9991V36.825V20.4208H42.4485ZM10.7392 38.2428C11.0151 37.968 11.1539 37.6401 11.1539 37.2616V37.0012C10.7161 37.1756 10.2389 37.2616 9.72914 37.2616C8.69335 37.2616 7.8015 36.8933 7.05273 36.1565C6.30308 35.424 5.93298 34.5457 5.93298 33.5224C5.93298 32.5033 6.30308 31.6224 7.05273 30.8891C7.8015 30.1532 8.69335 29.7849 9.72914 29.7849C10.7761 29.7849 11.6731 30.149 12.4176 30.8815C13.1586 31.6115 13.5296 32.4923 13.5296 33.5224V37.2616C13.5296 38.2917 13.1586 39.1734 12.4176 39.9025C11.6731 40.635 10.7761 41 9.72914 41C8.69335 41 7.8015 40.6308 7.05273 39.8958C6.30308 39.1624 5.93298 38.2799 5.93298 37.2616H8.30782C8.30782 37.6401 8.44746 37.968 8.73105 38.2428C9.01036 38.5218 9.34704 38.6592 9.72914 38.6592C10.1258 38.6592 10.4591 38.5218 10.7392 38.2428ZM8.73105 16.7236C8.60682 16.6015 8.50831 16.4675 8.44062 16.3225H13.4876C13.5176 16.1319 13.5296 15.939 13.5296 15.7383C13.5296 14.7082 13.1586 13.8267 12.4176 13.0966C11.6731 12.3675 10.7761 12 9.72914 12C8.69335 12 7.8015 12.3675 7.05273 13.1051C6.30308 13.8374 5.93298 14.7192 5.93298 15.7383C5.93298 16.7616 6.30308 17.6392 7.05273 18.3759C7.8015 19.1083 8.69335 19.4758 9.72914 19.4758C10.7761 19.4758 11.6731 19.1118 12.4176 18.38C12.7954 18.0067 13.0781 17.5911 13.264 17.141H9.72914C9.34704 17.141 9.01036 16.9994 8.73105 16.7236ZM7.37399 24.1752V25.0898C7.37399 25.4657 7.51708 25.797 7.79722 26.0726C8.0808 26.3516 8.41406 26.489 8.79959 26.489V28.8248C7.75952 28.8248 6.86766 28.4598 6.12317 27.7231C5.37439 26.9872 5 26.1097 5 25.0898V19.4952H7.37399V20.6998C7.81606 20.5261 8.28813 20.4368 8.79959 20.4368V22.7734C8.41406 22.7734 8.0808 22.9142 7.79722 23.1898C7.51708 23.4688 7.37399 23.795 7.37399 24.1752ZM12.5306 24.3682C12.8108 24.0926 13.1466 23.9552 13.5296 23.9552V21.616C12.4938 21.616 11.6002 21.9836 10.8523 22.7211C10.1027 23.4528 9.72914 24.3311 9.72914 25.3544V28.8248H12.1074V25.3544C12.1074 24.9743 12.2479 24.6464 12.5306 24.3682ZM22.0618 37.2616H18.263C17.2229 37.2616 16.3302 36.8933 15.5815 36.1565C14.837 35.424 14.4626 34.5457 14.4626 33.5224C14.4626 32.5033 14.837 31.6224 15.5815 30.8891C16.3302 30.1532 17.2229 29.7849 18.263 29.7849C19.3099 29.7849 20.2052 30.149 20.9463 30.8815C21.6873 31.6115 22.0618 32.4923 22.0618 33.5224V37.2616ZM19.2671 15.0202C19.5472 15.2992 19.6843 15.627 19.6843 16.0063V19.4758H22.0618V16.0063C22.0618 14.9755 21.6873 14.0938 20.9463 13.3612C20.2052 12.632 19.3099 12.268 18.263 12.268C17.2229 12.268 16.3302 12.6364 15.5815 13.3696C14.837 14.1048 14.4626 14.9839 14.4626 16.0063V19.4758H16.8374V16.0063C16.8374 15.627 16.9805 15.2992 17.2606 15.0202C17.5451 14.7412 17.8766 14.6037 18.263 14.6037C18.6554 14.6037 18.9921 14.7412 19.2671 15.0202ZM17.2606 26.0726C17.1347 25.9487 17.037 25.8147 16.9693 25.6739H22.0206C22.048 25.4842 22.0618 25.2878 22.0618 25.0898C22.0618 24.0597 21.6873 23.178 20.9463 22.4455C20.2052 21.7164 19.3099 21.3514 18.263 21.3514C17.2229 21.3514 16.3302 21.7189 15.5815 22.4522C14.837 23.1898 14.4626 24.0673 14.4626 25.0898C14.4626 26.1097 14.837 26.9872 15.5815 27.7231C16.3302 28.4598 17.2229 28.8248 18.263 28.8248C19.3099 28.8248 20.2052 28.4598 20.9463 27.7315C21.3284 27.3547 21.612 26.9425 21.797 26.489H18.263C17.8766 26.489 17.5451 26.3516 17.2606 26.0726ZM34.7192 15.5461C34.7192 17.0557 35.9629 18.2788 37.4949 18.2788C39.0284 18.2788 40.2715 17.0557 40.2715 15.5461C40.2715 14.039 39.0284 12.815 37.4949 12.815C35.9629 12.815 34.7192 14.039 34.7192 15.5461ZM42.4468 15.5461C42.4468 17.0557 43.6908 18.2788 45.2243 18.2788C46.7569 18.2788 48 17.0557 48 15.5461C48 14.039 46.7569 12.815 45.2243 12.815C43.6908 12.815 42.4468 14.039 42.4468 15.5461Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </div>
        <div className="progressBar">
            <div className="progress"  style={{width,backgroundColor: error ? "#f40" :colors.logo_color}}/>
        </div>
        <Heading align="center" title="Conectando..." color={colors.title}/>
        <Heading align="center"  size={4} color={colors.subtitle} title={step.message}/>
      </div>
    </Container>
  );
};

export default InitializationPage;
