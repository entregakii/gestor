
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../config';
import { useDispatch } from '../contexts/main';
import Heading from '../elements/Heading';
import Icon from '../elements/Icon';
import { useAlert } from '../hooks/alert';

export const Container = styled.div`
    background-color: ${colors.background_secondary};
    width: 72px;
    height: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
        display: flex;
        flex-direction: column;

        > .link{

        margin-bottom: 12px;
        display: block;

        .item {

            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background-color: ${colors.background};
            color: ${colors.subtitle};
            transition: 200ms;

            &:hover{
                opacity: 0.8;
            }
        }

        &.active{
            .item {
                background-color: ${colors.logo_color};
                color: ${colors.background};
            }
        }
        }

        @media(max-width: 600px){
        &{
            height: 72px;
            width: 100%;
            padding: 12px;
            flex-direction: row;

            >.link{
                margin-bottom: 0px;
                margin-right: 12px;
            }
        }
        }
    }

    
`;


const Navigator = () => {

    const {logout} = useDispatch()
    const alert = useAlert()

    const Prevent = () => {
        const unloadCallback = (event:any) => {
            // alert.open("WARNING",{message: "Tem certeza que deseja sair ? você deixará de receber pedidos!"})
            event.preventDefault();
            event.returnValue = "";
            return ''
          };
        
          window.addEventListener("beforeunload", unloadCallback);
          //return () => window.removeEventListener("beforeunload", unloadCallback);
    }

    useEffect(() => {
        Prevent()
      }, []);


  return <Container>

      <div>

    <NavLink exact className="link" to="/" activeClassName="active">
        <div className="item">
            <Icon name="home" />
        </div>
    </NavLink>

    <NavLink className="link" to="/pedidos" activeClassName="active">
        <div className="item">
            <Icon name="order" />
        </div>
    </NavLink>

    {/* <NavLink className="link" to="/entregas" activeClassName="active">
        <div className="item">
            <Icon name="motocycle" />
        </div>
    </NavLink> */}

    <NavLink className="link" to="/catalogo" activeClassName="active">
        <div className="item">
            <Icon name="bag" />
        </div>
    </NavLink>

    </div>

    <div>
        <a className="link" onClick={logout}>
            <div className="item">
                <Icon name="logout" />
            </div>
        </a>
    </div>


  </Container>;
}

export default Navigator;