import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withRouter } from 'react-router-dom';

import queryString from 'query-string';

import * as editorActions from 'store/modules/editor';

class EditorHeaderContainer extends Component {

    componentDidMount(){
        const { EditorAtions, location } = this.props;
        EditorAtions.initialize();  //에디터를 초기화 합니다.

        //쿼리 파싱
        const { id } = queryString.parse(location.search);
        if(id){
            //id가 존재하면 포스트 불러오기
            EditorAtions.getPost(id);
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    handleSubmit = async () => {
        const { title, markdown, tags, EditorAtions, history, location } = this.props;
        const post = {
            title,
            body: markdown,
            //태그 텍스트를 , 로 분리시키고 앞뒤 공백을 지운 후 중복되는 값을 제거합니다.
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag=>tag.trim()))]
        };
        try {
            //id가 존재한다면 editPost 호출
            const { id } = queryString.parse(location.search);
            if(id){
                await EditorAtions.editPost({id, ...post});
                history.push(`/post/${id}`);
                return;
            }
            await EditorAtions.writePost(post);
            //페이지를 이동시킵니다. 주의: postId는 위쪽에서 레퍼런스를 만들지 않고
            //이 자리에서 this.props.postId를 조회해야 합니다. (현재 값을 불러오기 위함)
            history.push(`/post/${this.props.postId}`); 
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { handleGoBack, handleSubmit } = this;
        const { id } = queryString.parse(this.props.location.search);

        return (
            <EditorHeader
                onGoBack = { handleGoBack }
                onSubmit = { handleSubmit }
                isEdit = {id? true : false}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorAtions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer));