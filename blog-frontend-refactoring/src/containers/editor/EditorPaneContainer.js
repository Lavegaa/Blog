import React from 'react';
import EditorPane from '@components/editor/EditorPane';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput } from '@store/Editor/editor';



const EditorPaneContainer = () => {
    const dispatch = useDispatch();
    const editor  = useSelector(state => state.editor);
    const {title, tags, markdown} = editor;
    // const { tags } = useSelector(state => state.editor['tags']);
    // const { markdown } = useSelector(state => state.editor['markdown']);
    const handleChangeInput = ({name, value}) => {
        dispatch(changeInput({name, value}));
    }
    return (
        <EditorPane
            title = {title}
            markdown = {markdown}
            tags = {tags}
            onChangeInput = {handleChangeInput}
        />
    );
    
}

export default EditorPaneContainer;