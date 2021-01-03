import React, { useEffect } from 'react';
import styled from 'styled-components';
import CodeMirror from 'codemirror';
import oc from 'open-color';

import 'codemirror/mode/markdown/markdown'; //마크다운 문법 색상
//마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

//CodeMirror를 위한 css스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const EditorPanes = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    `;

const Title = styled.input`
    background: ${oc.gray[7]};
    border: none;
    outline: none;
    font-size: 1.5rem;
    padding: 1rem;
    color: white;
    font-weight: 500;
    &::placeholder {
        color: rgba(255, 255, 255, 0.75);
    }
`;

const CodeEditor = styled.div`
    flex: 1;    //남은 영역 다 차지
    background: ${oc.gray[9]};
    display: flex;
    flex-direction: column;
    .CodeMirror {
        font-size: 1.5  rem;
        flex: 1;
        font-family: 'D2 Coding';
    }
`;

const Tags = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    background: ${oc.gray[7]};
    display: flex;
    align-items: center;
`;

const Description = styled.div`
    font-size: 0.85rem;
    color: white;
    font-weight: 600;
    margin-right: 1rem;
`;

const Input = styled.input`
    font-size: 0.85rem;
    border: none;
    flex: 1;
    background: none;
    outline: none;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    &::placeholder {
        color: rgba(255, 255, 255, 0.75);
    }
`;

const EditorPane = ({ tags, title, markdown, onChangeInput }) => {
    
    let editor = null //에디터 ref
    let codeMirror = null //CodeMirror 인스턴스
    let cursor = null   //에디터의 텍스트 cursor 위치

    const initializeEditor = () => {
        let codeMirror = CodeMirror(editor, {
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true,  //왼쪽에 라인 넘버 띄우기
            lineWrapping: true  //내용이 너무 길면 다음 줄에 작성
        });
        codeMirror.on('change', handleChangeMarkdown)
    }

    useEffect(() => {
        initializeEditor();
    }, []);

    const handleChange = (e) => {
        const { value, name } = e.target;
        onChangeInput({name, value});
    }

    const handleChangeMarkdown = (doc) => {
        cursor = doc.getCursor();  //텍스트 cursor 위치 저장
        onChangeInput({
            name: 'markdown',
            value: doc.getValue()
        });
    }

    useEffect(() => {
        if(!codeMirror) return; //아직 인스턴스를 만들지 않았을 때
        codeMirror.setValue(markdown);
        if(!cursor) return; //커서가 없을 때
        codeMirror.setCursor(cursor);
    }, [markdown]);

    return (
        <EditorPanes>
            <Title 
                placeholder="제목을 입력하세요" 
                name="title"
                value={title}
                onChange={handleChange}
            />
            <CodeEditor ref={ref => editor = ref}></CodeEditor>
            <Tags>    
                <Description>태그</Description>
                <Input 
                    name="tags" 
                    placeholder="태그를 입려하세요 (쉼표로 구분)"
                    value={tags}
                    onChange={handleChange}
                />
            </Tags>
        </EditorPanes>
    );
}

export default EditorPane;