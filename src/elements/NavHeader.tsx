import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../config';

const Container = styled.div`

    border-bottom: 1px solid ${colors.gray200};
    width: 100%;

    > .nav {
        display: flex;
        justify-content: center;
        //box-shadow: 0 4px 17px 6px rgb(0 0 0 / 5%);
     //   padding: 3px;
       // border-radius: 0.5rem;
    }
    //border-bottom: 1px solid ${colors.background_secondary};
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  
`;

 const NavItem = styled.div`

    > a {
       
        padding: 10px 15px;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
       // border-radius: 0.5rem;
        transition: 200ms;

        > .title {
            line-height: 1rem;
            color: ${colors.subtitle};
            font-size: 1rem;
        }

        > .notification {
            line-height: 10px;
            color: ${colors.background};
            font-size: 12px;
            min-width: 18px;
            height: 18px;
            padding: 0px 3px;
            border-radius: 9px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            font-family: Whitney Bold;
            background-color: ${colors.primary_color};
        }

        &.selected {
            > .title{
                color: ${colors.primary_color};
                font-family: Whitney Bold;
            }
            /* border-bottom: 3px solid ${colors.primary_color}; */
            border-bottom: 1px solid ${colors.primary_color};
           // background-color: ${colors.primary_color};
        }
        &:hover:not(.selected) {
          
            /* border-bottom: 3px solid ${colors.primary_color}; */
            background-color: ${colors.background_secondary};
        }

    }
`;

const NavHeader = ({routes}:{routes: {title: string,route: string,notification?:any}[]}) => {
  return <Container>
      <div className="nav">
          {routes.map(r => (
            <NavItem key={r.route}>
                <NavLink exact to={r.route} activeClassName="selected">
                    <div className="title">{r.title}</div>
                    {!!r.notification && <div className="notification">{r.notification}</div> }
                </NavLink>
            </NavItem>
          ))}
      </div>
  </Container>
}

export default NavHeader;