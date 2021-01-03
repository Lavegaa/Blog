import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';

//전달받은 className, onClick 등 값들이 rest 안에 들어 있다.
//JSX에서 ...을 사용하면 내부에 있는 값들을 props로 넣어준다.
const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

const Button = ({
    children, to, onClick, disabled, theme = 'default',
}) => {
    //to값이 존재하면 Link를 사용하고, 그렇지 않으면 div를 사용합니다.
    //비활성화되어 있는 버튼일 때도 div를 사용합니다.
    const Element = (to && !disabled) ? styled(Link)+CustomButton : styled.Div+CustomButton;
    const CustomButton = `
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
    cursor: pointer;
    user-select: none;  //드래그 방지
    display: inline-flex;
    
    ${({theme}) => theme === "default" &&  `
        background: ${oc.blue[6]};
        &:hover{
            background: ${oc.blue[5]};
        }
        &:active{
            background: ${oc.blue[6]};
        }
    `}
    
    ${({theme}) => theme === "gray" &&  `
        background: ${oc.gray[7]};
        &:hover{
            background: ${oc.gray[6]};
        }
        &:active{
            background: ${oc.gray[7]};
        }
    `}
    
    ${({theme}) => theme === "outline" &&  `
        border: 2px solid white;
        border-radius: 2px;
        &:hover{
            background: white;
            color: ${oc.blue[6]};
        }
        &:active{
            background: rgba(255, 255, 255, 0.85);
            border: 2px solid rgba(255, 255, 255, 0.85)
        }
    `}
    
    &:hover{
        @include material-shadow(2,0.5);
    }
    
    ${({disabled}) => disabled &&  `
        background: ${oc.gray[4]};
        color: ${oc.gray[6]};
        cursor: default;
        &:hover, &:active{
            box-shadow: none;
            background: ${oc.gray[4]};
        }
    `}
    
    & + & {
        margin-left: 0.5rem;
    }
    `;

    //비활성화하면 onClick은 실행되지 않습니다.
    //disabled 값이 true가 되면 className에 disable을 추가합니다.
    return (
        <Element
            to={to}
            theme={theme}
            disabled={disabled}
            onClick = {disabled ? () => null : onClick}>
            {children}
        </Element>
    );
};

export default Button;