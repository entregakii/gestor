import React from 'react';
import { ReactNode } from 'react';

import styled from 'styled-components';
import { colors } from '../config';

interface TableHeaderProps {
    title: string
    type?: string
    percent?: string
}

interface TableProps {
    header: TableHeaderProps[];
    data: any[]
    renderItem: (item: any) => any[];
    footerComponent?: ReactNode;
    onClick?: (item:any) => void;
}

export const Container = styled.div`

    width: 100%;
    border-radius: 10px;

    .tr{
        width: 100%;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--background_secondary);
        padding: 5px 5px;
        color: var(--title);
        transition: 200ms;

        &:not(.first):hover{
            background-color: ${colors.gray50};
        }

        .th{
            font-weight: bold;
            flex: 1;
            align-items: center;
            padding: 5px;
            font-size: 0.9rem;
        }

        .td {
            flex: 1;
            padding: 5px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
       
        }
    }
`;

const Table = ({onClick,header = [],data = [],renderItem,footerComponent}:TableProps) => {
  return <Container>
     
      <div className="header">
        <div className="tr first">
            {header.map(h => (
                <div className="th" style={{flex: `0 0 ${h.percent}` || 1}}>{h.title}</div>
            ))}
        </div>
      </div>

      <div className="content">
            {data.map((line) => {
                let titles = renderItem(line);
                return (<div style={{cursor: !!onClick ? "pointer" : "auto"}} className="tr" onClick={() => onClick ? onClick(line) : undefined}>
                    {titles.map((t,i) => (
                        <div className="td" style={{flex: `0 0 ${header[i].percent}` || 1}}>{t}</div>
                    ))}
                </div>)
            })}
      </div>

      <div className="footer">{footerComponent}</div>
     
  </Container>;
}

export default Table;