import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../config';
import Heading from '../elements/Heading';

interface OrderProgress {
    type: "circle" | "bar" | "timeout"
    data: any
}

const OrderProgress = ({type,data}:OrderProgress) => {

    const [time,setTime] = useState(new Date());
    // const {merchant} = useSelector(s=>s);

    useEffect(() => {
        setTimeout(() => {
            setTime(new Date())
        },1000)
    },[time])

    var circles:any = [];
    var size = 50;
    var s = size/2;
    var stroke = 5;
    var radius = s - (stroke/2);
    
    const dateTimeToPercent = (array:{start: any,end: any,color: string,animation?: boolean}[],min: string,max:string) => {

        let newarray:any = [];

        let minDate = new Date(min).getTime();
        let maxDate = new Date(max).getTime();

        let maxPeriod = maxDate - minDate;
        let offset = 0;

        let ended = false;

        array.map(({start,end,...props},i:number) => {

            if(ended)
                return;
            
            let period = new Date(end).getTime() - new Date(start).getTime();
            let percent = period*100/maxPeriod;
            percent = percent > 100 ? 100 : percent;
            let newend = percent+offset


          

        
                if(newend > 100){
                    newarray.push({
                        start: offset > 100 ? 100 : offset,
                        end: 100,
                        ...props,
                        animation: true,
                        color: colors.red400
                    })
                    return ended = true;
                }else
                {
                    newarray.push({
                        start: offset > 100 ? 100 : offset,
                        end: newend > 100 ? 100 : newend,
                        ...props
                    })
                }
            

          

            offset += percent;

        })

        return newarray

    }
   
    
    const elements:any = {
        "PDG": {
            icon: "stopwatch",
            color: colors.red400,
            title: "Pendente",
            progress: () => {

                let limitToAccept = (new Date(data.orderedDateTime).getTime() / 1000 ) + (15*60)
                let toAccept = Math.round(limitToAccept - (time.getTime()/1000) )
                let end = (toAccept*100/(15*60))
                let timeOut = toAccept > 60 ? Math.floor(toAccept/60)+1+"m" : toAccept+"s"
                return ({
                    values: [{start: 0,end,color: colors.red400,animation: true}],
                    timeOut
                })

            },
        },
        "CFM": {
            icon: "stopwatch",
            color: colors.yellow400,
            title: "Preparando",
            progress: () => {
               
                return ({
                    values: dateTimeToPercent([
                        {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.green400},
                        {start: data.details.confirmedDateTime, end: new Date(),color: colors.yellow400,animation: true}
                    ],data.orderedDateTime,data.details.estimatedMaxDateTime),
                    timeOut: ""
                })

            },
        },
        "DSP": {
            icon: "stopwatch",
            color: colors.green400,
            title: "Entregando",
            progress: () => {
               
                return ({
                    values: dateTimeToPercent([
                        {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.green400},
                        {start: data.details.confirmedDateTime, end: data.details.dispatchedDateTime,color: colors.green400},
                        {start: data.details.dispatchedDateTime, end: new Date(),color: colors.yellow400,animation: true}
                    ],data.orderedDateTime,data.details.estimatedMaxDateTime),
                    timeOut: ""
                })

            },
        },
        "RTP": {
            icon: "stopwatch",
            color: colors.green400,
            title: "Aguardando cliente",
            progress: () => {
               
                return ({
                    values: dateTimeToPercent([
                        {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.green400},
                        {start: data.details.confirmedDateTime, end: data.details.dispatchedDateTime,color: colors.green400},
                        {start: data.details.dispatchedDateTime, end: new Date(),color: colors.yellow400,animation: true}
                    ],data.orderedDateTime,data.details.estimatedMaxDateTime),
                    timeOut: ""
                })

            },
        },
        "CON": {
            icon: "stopwatch",
            color: colors.green400,
            title: "Concluído",
            progress: () => {
               
                return ({
                    values: dateTimeToPercent([
                        {start: data.details.orderedDateTime, end:data.concludedDateTime, color: colors.secondary}
                    ],data.orderedDateTime,data.details.estimatedMaxDateTime),
                    timeOut: ""
                })

            },
        }
    }


    // const elements:any = {
    //     "PDG": {
    //         icon: "stopwatch",
    //         color: colors.red400,
    //         title: "Pendente",
    //         progress: () => {

    //             let limitToAccept = (new Date(data.orderedDateTime).getTime() / 1000 ) + (15*60)
    //             let toAccept = Math.round(limitToAccept - (time.getTime()/1000) )
    //             let end = (toAccept*100/(15*60))
    //             let timeOut = toAccept > 60 ? Math.floor(toAccept/60)+1+"m" : toAccept+"s"
    //             return ({
    //                 values: [{start: 0,end,color: colors.red400}],
    //                 timeOut
    //             })

    //         },
    //     },
    //     "CFM": {
    //         icon: "stopwatch",
    //         color: colors.yellow400,
    //         title: "Preparando",
    //         progress: () => {
               
    //             return ({
    //                 values: dateTimeToPercent([
    //                     {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.red400},
    //                     {start: data.details.confirmedDateTime, end: new Date(),color: colors.yellow400}
    //                 ],data.orderedDateTime,data.details.estimatedMaxDateTime),
    //                 timeOut: ""
    //             })

    //         },
    //     },
    //     "DSP": {
    //         icon: "stopwatch",
    //         color: colors.green400,
    //         title: "Entregando",
    //         progress: () => {
               
    //             return ({
    //                 values: dateTimeToPercent([
    //                     {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.red400},
    //                     {start: data.details.confirmedDateTime, end: data.details.dispatchedDateTime,color: colors.yellow400},
    //                     {start: data.details.dispatchedDateTime, end: new Date(),color: colors.green400}
    //                 ],data.orderedDateTime,data.details.estimatedMaxDateTime),
    //                 timeOut: ""
    //             })

    //         },
    //     },
    //     "RTP": {
    //         icon: "stopwatch",
    //         color: colors.green400,
    //         title: "Aguardando cliente",
    //         progress: () => {
               
    //             return ({
    //                 values: dateTimeToPercent([
    //                     {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.red400},
    //                     {start: data.details.confirmedDateTime, end: data.details.dispatchedDateTime,color: colors.yellow400},
    //                     {start: data.details.dispatchedDateTime, end: new Date(),color: colors.green400}
    //                 ],data.orderedDateTime,data.details.estimatedMaxDateTime),
    //                 timeOut: ""
    //             })

    //         },
    //     },
    //     "CON": {
    //         icon: "stopwatch",
    //         color: colors.green400,
    //         title: "Concluído",
    //         progress: () => {
               
    //             return ({
    //                 values: dateTimeToPercent([
    //                     {start: data.orderedDateTime,end: data.details.confirmedDateTime,color: colors.red400},
    //                     {start: data.details.confirmedDateTime, end: data.details.dispatchedDateTime,color: colors.yellow400},
    //                     {start: data.details.dispatchedDateTime, end:data.concludedDateTime, color: colors.green400}
    //                 ],data.orderedDateTime,data.details.estimatedMaxDateTime),
    //                 timeOut: ""
    //             })

    //         },
    //     }
    // }

    
    var {  icon,color,title,progress } = elements[data.status]

    var {values,timeOut} = progress();

    // var values:any = [
    //     {
    //         "start": 0,
    //         "end": 10,
    //         "color": "#E11900"
    //     },
    //     {
    //         "start": 10,
    //         "end": 30,
    //         "color": "#2334ff"
    //     },
    //     {
    //         "start": 30,
    //         "end": 50,
    //         "color": "#FFC043"
    //     },
    //     {
    //         "start": 50,
    //         "end": 100,
    //         "color": "#05944F"
    //     }
    // ]

    values.map(({start,end,...props}:any,index:number) => {

        end = end > 100 ? 100 : end

       // var division = 0//(values.length > 1 ? 5 : 0) * index
        var a = type === "circle" ? 8 : 1
        var max = 100 //- (index*5)
        var less = values.length > 1 ? (values.length - (type === "circle" ? 0 : 1)) * a : 0
        var v = end - start ;
        var val = (100 - less)*v/100
 
 
        //var rotate = (values.length > 1 ? (360*(start-division)/100) - 45 - division : -90);
        var left = (100 - less)*(start)/100 + (a*index)
        var rotate = (360*(left)/max) - 90
        
        var strokeDasharray = radius * 2 * Math.PI
        var strokeDashoffset = strokeDasharray - (val / max) *  strokeDasharray  

        circles.push({
            strokeDasharray,strokeDashoffset,rotate,val,left,...props
        })

    })

  return <Container>
        { type === "circle" && <><div className='progressBar'>
            {circles.map(({strokeDasharray,strokeDashoffset,color,rotate,animation}:any) => (
                <svg className={animation ? "animation" : ""} id="svg" width={size} height={size} style={{transform: `rotate(${rotate}deg)`}}>
                   
                    <circle strokeLinecap='round' id="bar" r={radius} cx={s}  cy={s} stroke={ color} strokeWidth={stroke} fill="transparent" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}></circle>
                </svg> 
            ))}
            <div className='icon'>
                <Heading bold size={5} color={color} title={timeOut}/>
                {/* <Icon name={icon} color={color}/> */}
            </div>
        </div> 
        <div style={{height: 10}}/>
        <Heading bold size={5} color={color} title={title}/>
        </>  }
        { type === "timeout" && <div className='progressBar'>
            <div className='icon'>
                <Heading bold size={5} color={color} title={timeOut}/>
            </div>
        </div>  }
        { type === "bar" && <><div className='progressBar2'>
            {circles.map(({strokeDasharray,strokeDashoffset,color,val,left}:any) => (
                <div className='progress' style={{left: left+"%",width: val+"%",backgroundColor: color}}/>
                    
            ))}
        </div>
        {/* <div style={{height: 10}}/>
        <Heading bold size={5} color={color} title={title}/> */}
        </> }

       

     </Container>;
}


export const Container = styled.div`

    align-items: center;
    display: flex;
    flex-direction: column;

    .progressBar2{
        height: 10px;
        width: 100%;
        margin: 0px 0;
        position: relative;

        .progress{
            height:10px;
            border-radius: 5px;
            position: absolute;
        }
    }

    .progressBar{
        position: relative;
        width: 50px;
        height: 50px;

        svg{
            position: absolute;

            /* &.animation{ */
            &.animation {
                circle {
                    animation: animationSvg infinite 2s ;
                }
            }
            /* } */
        }

        .icon{
            position: absolute;
            align-items: center;
            justify-content: center;
            display: flex;
            width: 50px;
            height: 50px;
        }
    }

    @keyframes animationSvg {
        0%{
            opacity: 0.1;
        }
        50%{
             opacity: 0.5;
        }
        100%{
            opacity: 0.1;
        }
    }
`;

export default OrderProgress;