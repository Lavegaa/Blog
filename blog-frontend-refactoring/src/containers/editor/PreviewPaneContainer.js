import React from 'react';
import { useSelector } from 'react-redux';
import PreviewPane from '@components/editor/PreviewPane';


const PreviewPaneContainer = () => {
    const editor  = useSelector(state => state.editor);
    const {title, markdown} = editor;
    return (
        <PreviewPane title={title} markdown={markdown}/>
    );
    
}

export default PreviewPaneContainer;