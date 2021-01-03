import React, { useState, useEffect } from 'react';
import marked from 'marked';
import styled from 'styled-components';
import oc from 'open-color';

//prismjs관련 코드
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
//지원할 코드 형식을 불러옵니다.
//http://prism.coom/#language-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const Markdown = styled.div`
    blockquote {
        border-left: 4px solid ${oc.blue[6]};
        padding: 1rem;
        background: ${oc.gray[1]};
        margin-left: 0;
        margin-right: 0;
        p {
            margin: 0;
        }
    }

    h1, h2, h3, h4 {
        font-weight: 500;
    }
    
    //텍스트 사이의 코드
    h1, h2, h3, h4, h5, p {
        code {
            font-family: 'D2 Coding';
            background: ${oc.gray[0]};
            padding: 0.25rem;
            color: ${oc.blue[6]};
            border: 1px solid ${oc.gray[2]};
            border-radius: 2px;
        }
    }
    
    //코드 블록
    code[class*="language-"], pre[class*="language-"] {
        font-family: 'D2 Coding';
    }
    
    a {
        color: ${oc.blue[6]};
        &:hover {
            color: ${oc.blue[5]};
            text-decoration: underline;
        }
    }
    
    //표 스타일
    table {
        border-collapse: collapse;
        widows: 100%;
    }
    
    table, th, td {
        border: 1px solid ${oc.gray[4]};
    }
    
    th, td {
        font-size: 0.9rem;
        padding: 0.25rem;
        text-align: left;
    }
    
    //이미지 최대 크기 설정 및 가운데 정렬
    img {
        max-width: 100%;
        margin: 0 auto;
        display: block;
    }
`;

const MarkdownRender = ({ markdown }) => {
    const [html, setHtml] = useState(markdown ? marked(markdown, {breaks: true, sanitize: true}) : '');

    const renderMarkdown = () => {
        //마크다운이 존재하지 않는다면 공백 처리
        if(!markdown){
            setHtml('');
            return;
        }
        setHtml(marked(markdown, {
            breaks: true,   //일반 엔터로 새줄 입력
            sanitize: true  //마크다운 내부 html 무시
        }))
    }
    

    useEffect(() => {
        Prism.highlightAll();
    }, [])

    useEffect(() => {
        renderMarkdown();
    }, [markdown])

    useEffect(() => {
        Prism.highlightAll();
    }, [html])

    //react에서 html을 렌더링 하려면 객체를 만들어 내부에
    //__html값을 설정해야 합니다.

    const markup = {
        __html: html
    };

    //그리고 dangerouslySetInnerHTML 값에 해당 객체를 넣어주면 됩니다.
    return (
        <Markdown dangerouslySetInnerHTML={markup}/>
    );
    
}

export default MarkdownRender;