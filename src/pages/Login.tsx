import { useState } from 'react';
import styled from 'styled-components';
// import { Container } from './styles';
import TEXTURE from '../assets/texture.png';
import { colors } from '../config';
import { useApi, useDispatch } from '../contexts/main';
import Button from '../elements/Button';
import Heading from '../elements/Heading';
import Loading from '../elements/Loading';
import TextInput from '../elements/TextInput';
import { useAlert } from '../hooks/alert';
import { useStateForm } from '../hooks/useStateForm';

const LoginPage = () => {

    const {registerField,getFields} = useStateForm();
    const dispatch = useDispatch();
    const api = useApi(); 
    const [loading,setLoading] = useState(false);
    const alert = useAlert()

    const onPress = async () => {

        const fields = getFields();

        setLoading(true)

        try {

            const {data} = await api.get("/auth/authentificate",{params: fields})
            setLoading(false)

            if(data){
                const {login,accessToken,refreshToken}:any = data;
                console.log(data)
                dispatch.login({accessToken,refreshToken,status: 'initializing'})
            }

        } catch (err:any) {
            if(err.response){
                if(err.response.status === 404)
                    alert.open("ERROR",{message: "Usuário ou senha inválidos."})
                else if(err.response.status === 403)
                    alert.open("WARNING",{message: "Você não tem permissão de entrar no gestor."})
                else 
                    alert.open("ERROR",{message: "OPS, algo deu errado."})
            }

        }

     setLoading(false)
    }

    return <Container>
        <div className='box'>
            
            <Heading title="Gestor de pedidos" align="center" size={1} bold/>
            <Heading title="Faça login para continuar" align="center"/>

            <div style={{height: 20}}/>

            { loading ? <Loading/> : <><form style={{width: '100%'}} onSubmit={(e) => {
                e.preventDefault();
                onPress();
            }}>

            <TextInput title="E-mail" {...registerField("email")}/>
            <TextInput title="Senha" {...registerField("password")}/>


            </form> 
            <div style={{height: 20}}/>
            <Button variant="outline" onClick={onPress} title="Entrar" color={colors.logo_color} style={{marginTop: 20}}/>
            </>}

        </div>
    </Container>;
}


const Container = styled.div`
 
    width: 100%;
    height: 100vh;
    background-color: #f0f2f5;
    background-image: url(${TEXTURE});
    background-repeat: repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: animatedBackground 10s infinite linear;

    @keyframes animatedBackground {
        100%{
            background-position: 200px -200px;
        }
    }

    .box {
        padding: 20px 50px;
        border-radius: 15px;
        width: 500px;
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
    }


`

export default LoginPage;

