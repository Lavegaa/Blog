import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EditorHeader from '@components/editor/EditorHeader';
import { initialize } from '@store/Editor/editor';

const EditorHeaderContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initialize());
    }, []);

    return (
        <EditorHeader />
    );
}

export default EditorHeaderContainer;