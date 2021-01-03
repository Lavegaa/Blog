import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MarkdownRender from '@components/common/MarkdownRender';

const Preview = styled.div`
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    font-size: 1.125rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 300;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${oc.gray[4]};
`;

const PreviewPane = ({ markdown, title }) =>  (
    <Preview>    
        <Title>
            {title}
        </Title>
        <div>
            <MarkdownRender markdown={markdown}/>
        </div>
    </Preview>
);

export default PreviewPane;