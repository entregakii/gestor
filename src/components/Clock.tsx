import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setTimeout } from 'timers';
import { colors } from '../config';


export const Container = styled.div`
  
    padding: 0 10px;

    > .content {
        font-size: 26px;
        font-family: Whitney Bold;
        color: ${colors.subtitle};
        text-align: center;
        width: 100%;
    }

`;


const Clock = ({fontSize}:any) => {

    const [hour,setHour] = useState<string>();
    const [now,setNow] = useState(new Date());

    const getHour = () => {
        setNow(new Date());
        const time = now.getHours().toString().padStart(2,"0")+":"+now.getMinutes().toString().padStart(2,"0")
        if(hour !== time)
            setHour(time)
    }

    useEffect(() => {
        getHour()
    },[])

    useEffect(() => {
        setTimeout(getHour,1000)
    },[now])

  return <Container>
    <div className="content" style={{fontSize}}>
        {hour}
    </div>
  </Container>;
}

export default Clock;