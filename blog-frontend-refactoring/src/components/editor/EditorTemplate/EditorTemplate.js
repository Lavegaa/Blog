import React, { useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Panes = styled.div`
    height: calc(100vh - 4rem);
    display: flex;
    background: ${oc.gray[1]};
`;

const Editor = styled.div`
    display: flex;
    flex: ${({ leftPercentage }) => leftPercentage};
    word-break: break-all;
    @media (min-width: 770px) {
        .editor {
            flex: 1!important;
        }
    }
`;

const Preview = styled.div`
    display: flex;
    flex: ${({ leftPercentage }) =>  1 - leftPercentage};
    word-break: break-all;
    @media (min-width: 770px) {
        .preview, .separator {
            display: none;
        }
    }
`;

const Seperator = styled.div`
    width: 1rem;
    height: 100%;
    position: absolute;
    transform: translate(-50%);
    left: ${({ leftPercentage }) => leftPercentage * 100}%;
    cursor: col-resize;
`;

const EditorTemplate = ({ header, editor, preview }) => {

    const [leftPercentage, setLeftPercentage] = useState(0.5);

    //separator 클릭 후 마우스를 움직이면 그에 따라 leftPercentage 업데이트
    const handleMouseMove = (e) => {
        setLeftPercentage(e.clientX / window.innerWidth);
    }

    //마우스를 뗏을 때 등록한 이벤트 제거
    const handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }

    //separator 클릭할 때
    const handleSeparatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    return (
        <div>
            {header}
            <Panes>
                <Editor leftPercentage={leftPercentage}>
                    {editor}
                </Editor>
                <Preview leftPercentage={leftPercentage}>
                    {preview}
                </Preview>
                <Seperator
                    leftPercentage={leftPercentage}
                    onMouseDown={handleSeparatorMouseDown}/>    
            </Panes>
        </div>
    );
}

export default EditorTemplate;